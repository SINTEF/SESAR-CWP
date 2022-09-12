
# Create the training dataset

The training dataset is a text file. Each line is a voice command and the corresponding response, separated by ": " (colon and space). Lines starting with a # are comments and are ignored. Empty lines are also ignored.

# Convert the training dataset to the right format

OpenAI requires a specific JSONL format for fine tuning the model. See the [documentation](https://beta.openai.com/docs/guides/fine-tuning).

```bash
python prepare-fine-tuning-dataset.py
```

A `fine-tuning-dataset.jsonl` file is created.

# Fine tune the model

```bash
pip install --upgrade openai
export OPENAI_API_KEY="<OPENAI_API_KEY>"
```

```bash
openai api fine_tunes.create -t ./fine-tuning-dataset.jsonl -m davinci
```