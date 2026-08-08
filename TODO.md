# TODO — Full groups API route structure (Next.js 14 App Router + Prisma)

- [x] Analyze project structure, Prisma schema, and existing API patterns
- [x] Confirm plan with user
- [x] Create `app/api/groups/route.ts` with GET handler (fetch all groups)
- [x] Create `app/api/groups/route.ts` with POST handler (create group) + validation
- [x] Create `app/api/groups/[id]/route.ts` with GET handler (fetch single group)
- [x] Create `app/api/groups/[id]/route.ts` with PUT handler (update group) + validation
- [x] Create `app/api/groups/[id]/route.ts` with DELETE handler (delete group)
- [x] Verify routes compile (typecheck)
- [x] Create `app/api/groups/[id]/tasks/route.ts` with GET (list tasks) + POST (create task)
- [x] Create `app/api/groups/[id]/tasks/[taskId]/route.ts` with PATCH (update/toggle task) + DELETE (remove task)
- [ ] Run final typecheck
