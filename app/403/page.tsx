export default function ForbiddenPage() {
  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-3">403 — Forbidden</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this resource. If you believe this is an error, please contact an administrator.
        </p>
        <a href="/admin" className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground">
          Go to Admin Dashboard
        </a>
      </div>
    </main>
  )
}
