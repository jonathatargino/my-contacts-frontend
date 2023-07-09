export default class EventManager<T = string, U = any> {
  listeners: Map<T, Array<(payload?: U) => void>>;

  constructor() {
    this.listeners = new Map<T, Array<(payload?: U) => void>>();
  }

  on(event: T, listener: (payload?: U) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: T, payload: U) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)?.forEach((listener) => {
      listener(payload);
    });
  }

  remove(event: T, listenerToRemove: (payload?: U) => void) {
    if (!this.listeners.has(event)) return;

    const eventListeners = this.listeners.get(event);
    const filteredEventListeners = eventListeners?.filter((listener) => listener !== listenerToRemove) as ((
      payload?: U,
    ) => void)[];

    this.listeners.set(event, filteredEventListeners);
  }
}
