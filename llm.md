<!-- #llm -->

# Links

- [LLM course](https://huggingface.co/learn/llm-course/chapter1/1)
- [Prompt engineering](https://www.promptingguide.ai/)

# Prompting

## Prompt elements

- instruction
- context
- input (e.g. question)
- output

An English-to-Spanish translation example:

```
Translate the following English sentence into Spanish. // instruction
You are a helpful language tutor assisting a beginner student. // context
Sentence: "Where is the nearest train station?" // input
Expected output: // output
```
ChatGPT replies `"¿Dónde está la estación de tren más cercana?"`.

## Tips

- **Start simple** and **keep adding** more elements to get better results.
- Use commands like **write**, **classify**, **summarize**, **translate**, **order** and so on.
- Be **very specific** about the instruction, the more details, the better results.
- **Avoid impreciseness**. For example
  - instead of `Explain the concept prompt engineering`
  - use `Use 2-3 sentences to explain the concept of prompt engineering`.
- It's better to **instruct what to do** than not to do.

## Prompting techniques

### Zero-shot vs few-shot prompting

If zero-shot prompting doesn't work, provide demonstrations of examples (few-shot prompting). An example of few-shot prompting:

```
This is awesome! // Negative
This is bad! // Positive
Wow that movie was rad! // Positive
What a horrible show! //
```

### Chain-of-Thought (CoT) prompting

Chain-of-Thought (CoT) prompting is when a model explicitly walks through intermediate steps to reach an answer. Instead of asking a question directly, you include a phrase that prompts the model to explain its reasoning, such as:
- **Let's think step by step**
- **Describe your reasoning in steps** 
- **Explain your reasoning step by step**.

```
John has one pizza, cut into eight equal slices.
John eats three slices, and his friend eats two slices.
How many slices are left?
Explain your reasoning step by step.
```

### Self-Consistency

The idea is to sample multiple, diverse reasoning paths through few-shot CoT, and use the generations to select the most consistent answer. This helps to boost the performance of CoT prompting on tasks involving arithmetic and commonsense reasoning.

```
Question: What is 12 + 15?

Please think through this problem by generating three different step-by-step reasoning paths.
After that, compare your answers and provide the final answer based on the most consistent result.

Reasoning 1:
Reasoning 2:
Reasoning 3:

Final answer:  
```

### Generate knowledge prompting

The idea is to pass knowledge in the prompt.

- Bad answer. Prompt:
  ```
  Part of golf is trying to get a higher point total than others. Yes or No?
  ```
  Answer:
  ```
  Yes.
  ```

- Good answer. Prompt:
  ```
  Question: Part of golf is trying to get a higher point total than others. Yes or No?
  Knowledge: The objective of golf is to play a set of holes in the least number of strokes. A round of golf typically consists of 18 holes. Each hole is played once in the round on a standard golf course. Each stroke is counted as one point, and the total number of strokes is used to determine the winner of the game.
  Explain and Answer: 
  ```
  Answer:
  ```
  The knowledge clearly states that the objective of golf is to complete the holes using the least number of strokes. Each stroke counts as one point, and the player with the lowest total points (strokes) wins. Therefore, in golf, the goal is to have a lower point total than others, not a higher one.

  Answer: No.
  In golf, you try to get a lower point total than others, not a higher one.
  ```

### Prompt chaining

Prompt chaining is a technique where a sequence of prompts is used to guide a large language model (LLM) to produce a desired output. It involves breaking down a complex task into smaller, sequential steps, with the output of one prompt serving as the input for the next.

# Misc

- Models
  - Llama
  - GPT
  - Claude
  - SmolLM
- **Commonsense reasoning** is a human-like ability to make presumptions about the type and essence of ordinary situations humans encounter every day.