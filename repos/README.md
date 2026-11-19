# Nested Repositories

Clone or copy the repositories that you want to inspect, review, or use into
this folder.

The provided IBM Bob modes are currently configured at project scope. Keep
the template repository as the IBM Bob workspace root so that the
preconfigured modes and skills remain available. Place your working
repositories under `repos/`, for example:

```bash
git clone <repository-url> repos/<repository-name>
```

```text
repos/
├── your-application/
│   └── task-handoff.md   # optional, written by Bob for unfinished tasks
└── another-repository/
```

## Task Handoff Files

When a review or specification is too large for one task, Bob writes a short
`task-handoff.md` (goal, done, open items, decisions, next steps) in the
workspace root or in the reviewed repository, for example
`repos/your-application/task-handoff.md`. Every mode reads this file first
when it exists, so you can continue with a prompt such as:

```text
Continue the review from repos/your-application/task-handoff.md.
```

Delete the file when the task is complete, or commit it in the reviewed
repository if you want to keep the progress record.
