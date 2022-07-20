export default class Releases {
    constructor(release, releaseCandidate) {
        this["#release"] = release;
        this["#releaseCandidate"] = releaseCandidate;
    }

    showReleases() {
        this["#releaseCandidate"] ? console.log('rc -> ' + this["#releaseCandidate"] + '\n') : console.log('rc -> none\n')
        this["#release"] ? console.log('r -> ' + this["#release"] + '\n') : console.log('r -> none\n')
    }

    get release() {
        return this["#release"];
    }

    get releaseCandidate() {
        return this["#releaseCandidate"];
    }
}