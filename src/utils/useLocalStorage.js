import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))

    if (savedValue) return savedValue

    // sprawdzanie czy zmienna czy funkcja, skoro useState może dostać oba typy, jeśli funkcja wywołaj ją, a jeśli zmienna zwróć ją.
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}

export default function useLocalStorage(key, initialValue) {
    // wywołanie useState jako funkcji, aby wywłać 1 raz przy inicjalizacji komponentu w przeciwnym razie przy każdej zmianie i wywołaniu metody render komponentu useState pobierałby dane z localStorage z parsowaniem to dość wolne...
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value]);

    return [value, setValue]
}