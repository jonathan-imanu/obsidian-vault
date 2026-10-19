import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("full sync reconciles moved, deleted, and ignored notes, including an empty vault", async () => {
  const fixture = await fs.realpath(await fs.mkdtemp(path.join(os.tmpdir(), "vault-sync-test-")));
  try {
    await fs.cp(path.join(root, "scripts"), path.join(fixture, "scripts"), { recursive: true });
    await fs.symlink(path.join(root, "node_modules"), path.join(fixture, "node_modules"), "dir");
    await fs.writeFile(path.join(fixture, "package.json"), '{"type":"module"}');
    const vault = path.join(fixture, "vault");
    await fs.mkdir(path.join(vault, "school", "cscc24"), { recursive: true });
    const oldNote = path.join(vault, "school", "cscc24", "Week 1.md");
    await fs.writeFile(oldNote, "# Week 1\nOriginal content");
    const run = () => execFileSync(process.execPath, [path.join(fixture, "scripts", "process-notes.js")], { stdio: "pipe" });
    const index = async () => JSON.parse(await fs.readFile(path.join(fixture, "processed-notes", "index.json"), "utf8"));
    const files = () => fs.readdir(path.join(fixture, "processed-notes", "notes"));
    run();
    assert.deepEqual(Object.keys((await index()).notes), ["school/cscc24/week-1"]);

    const semester = path.join(vault, "school", "w26", "cscc24");
    await fs.mkdir(semester, { recursive: true });
    const movedNote = path.join(semester, "Week 1.md");
    await fs.rename(oldNote, movedNote);
    // A previously generated orphan must disappear too.
    await fs.writeFile(path.join(fixture, "processed-notes", "notes", "orphan.json"), "{}");
    run();
    assert.deepEqual(Object.keys((await index()).notes), ["school/w26/cscc24/week-1"]);
    assert.deepEqual(await files(), ["school--w26--cscc24--week-1.json"]);
    const note = JSON.parse(await fs.readFile(path.join(fixture, "processed-notes", "notes", (await files())[0]), "utf8"));
    assert.match(note.content, /Original content/);

    await fs.writeFile(path.join(fixture, ".obsidian-sync-ignore"), "school/**\n");
    run();
    assert.deepEqual((await index()).notes, {});
    assert.deepEqual(await files(), []);

    await fs.writeFile(path.join(fixture, ".obsidian-sync-ignore"), "");
    run();
    await fs.unlink(movedNote);
    run();
    assert.deepEqual((await index()).notes, {});
    assert.deepEqual(await files(), []);

    // Invalid frontmatter must prevent a successful publish.
    await fs.writeFile(movedNote, "---\ntitle: [unterminated\n---\nBody");
    const failed = spawnSync(process.execPath, [path.join(fixture, "scripts", "process-notes.js")]);
    assert.notEqual(failed.status, 0);
  } finally {
    await fs.rm(fixture, { recursive: true, force: true });
  }
});
