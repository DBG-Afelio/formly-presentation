
/**
 * Debounce function calls
 * @param delay delay in ms to debounce (default: `300`)
 */
 export function Debounce(delay: number = 300): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        let timeout: any = null;

        const original = descriptor.value;

        descriptor.value = function(...args: any[]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => original.apply(this, args), delay);
        };

        return descriptor;
    };
}
