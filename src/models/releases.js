export default class Releases {
    constructor(release, releaseCandidate) {
        this.#release = release;
        this.#releaseCandidate = releaseCandidate;
    }

    showReleases() {
        this.#releaseCandidate ? console.log('rc -> ' + this.#releaseCandidate) : console.log('rc -> none')
        this.#release ? console.log('r -> ' + this.#release) : console.log('r -> none')
    }

    get release() {
        return this.#release;
    }

    get releaseCandidate() {
        return this.#releaseCandidate;
    }
}