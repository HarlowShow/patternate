export type isNotNull<T> = {
    kind: 'success',
    value: T,
}

export type isNull = {
    kind: 'failure',
    reason: string,
}

export type maybeNull<T> = isNotNull<T> | isNull;

