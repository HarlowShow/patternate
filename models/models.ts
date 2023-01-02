import { Ref } from 'vue'

export type isNotNull<T> = {
    kind: 'success',
    value: T,
}

export type isNull = {
    kind: 'failure',
    reason: string,
}

export type maybeNull<T> = isNotNull<T> | isNull;

export type Mode = 'draw' | 'guide'

export function nullCheck<T>(element: Ref<T | null>): maybeNull<T> {
    if (element.value !== null && element !== undefined) {
        return { kind: 'success', value: element.value }
    }
    return { kind: 'failure', reason: 'element is null' }
}