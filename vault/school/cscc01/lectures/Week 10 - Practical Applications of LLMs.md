**Chatbots**: A system that relies on the other LLM understanding inputs. System designers have a low degree of control.
- The common steering mechanism is the *1 Big Prompt*. The biggest advantage of this approach is it's simplicity BUT control is only available via prompt engineering and the quality of the results is determined by the quality of the LLM. 
## Workflows

A structured deterministic sequence of steps designed for repeatable tasks.
### Drawbacks

- Fully autonomous
- May not be an exact match to the intended use case
- Quality is dependent on LLM
- **Can only do predefined things**

The non-bolded drawbacks can be resolved with *function calling workflows* which add deterministic steps to ensure workflow reliability.
- Another approach is *human-in-the-loop workflows* where we askAI to discover what is missing, and prompt the user for follow-up information.
## Agents

An AI-driven process that uses reasoning to dynamically decide on steps to take and the tools to use to solve more open ended problems.
### Tools

Use tools when an agent needs additional context more deterministically.
- Similar to function calling - predetermined inputs and outputs used by the LLM. The outputs are used as LLM prompt input.

MCP servers can also be interacted with in the same way as tools.

# Quality Assurance

## LLM Evals

- User inputs are not fixed, intent may come in different forms.
- Even with the same inputs, the outputs are likely different.
### Scoring

Real human feedback with manual labelling or LLM-as-a-judge.
#### LLM-as-a-judge

- Accuracy and reliability 
	- Faithfulness to prompt 
	- completeness 
- Output quality
	- Toxicity
	- Keyword coverage 
	- bias
##### Proactive Scoring & refinement

1. LLMs to generate synthetic inputs
2. Run synthetic inputs through pipeline
3. Evaluate outputs
4. Refine prompts and restart step 2

Likely happens in CI when developing an agent.
##### Reactive Scoring

1. Receive real user input
2. Run pipeline
3. Run scoring and save for further action


