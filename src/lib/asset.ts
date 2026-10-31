// next/link adds basePath on its own; plain asset URLs (next/image src, canvas frames, CSS) need it added.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
