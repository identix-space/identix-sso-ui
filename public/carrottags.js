export function addCarrotTag(name) {
    if (typeof window.carrotquest !== 'undefined') {
        window.carrotquest.track(name);
    }
}
