
# Read ./fine-tuning-dataset.txt and prepare it for OpenAI GPT fine-tuning

import json

# Read ./fine-tuning-dataset.txt
with open('fine-tuning-dataset.txt', 'r') as f:
    lines = f.readlines()
    # Trim all lines
    lines = [line.strip() for line in lines]
    # Filter empty lines and lines starting with a #
    lines = [line for line in lines if line and not line.startswith('#')]

    # Split each line with the token ":" first is prompt, second is completion
    lines = [line.split(':') for line in lines]

    jsonl = [{'prompt': prompt.strip()+':', 'completion': ' '+completion.strip()+' END'} for prompt, completion in lines]

    # Write the jsonl file
    with open('fine-tuning-dataset.jsonl', 'w') as f:
        for line in jsonl:
            f.write(json.dumps(line) + '\n')