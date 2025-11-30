<!-- #typescript #ts -->

## Return type of an object by key as function argument

```typescript
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```