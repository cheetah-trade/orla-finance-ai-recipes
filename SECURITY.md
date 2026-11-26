# Security

## Reporting

Report privately through **GitHub private vulnerability reporting** on this repository (Security
tab, "Report a vulnerability"). If that is not available to you, write to support@orla.finance with
`security` in the subject.

Please do not open a public issue for a suspected vulnerability, and do not paste real company data
into an issue to show a problem: describe it on the sample instead.

## What is in scope

- A recipe, prompt or skill that would make an agent act without a person's yes: send, pay, approve,
  contact someone, or read more than the job needs.
- Hidden or injected instructions in a card, a prompt, a skill or a sample file.
- A sample file that turns out to hold real data (a real account, a real person, a real company's
  figures).
- The check script and the workflow that runs it.

## What the skills here can and cannot do

The skills are text. They ship no server, no script and no network access, and the check refuses a
skill whose front matter grants tools, hooks or a model, or that runs a command when it loads. On
live books they work only through the Orla plugin, whose connection holds no tool that moves money:
payments and transfers are not offered there and are refused if asked for by name.
