import Releases from "./releases";

const DEFAULT_FILE_PATH = ''

const r_regex = ''
const rc_regex = ''

export default class Repository {
    constructor(file_path = DEFAULT_FILE_PATH) {
        this.#branches = loadJson(file_path);
        this.#releases = null;

        this.#analyzeBranches(this.#releases, this.#branches);
    }

    showRepositoryReleases() {
        this.#releases ? this.#releases.showReleases() : 'There are not r and rc for this repository';
    }

    addBranches([branches]) {
        this.#analyzeBranches(this.#releases, branches);
    }

    #analyzeBranches(currentReleases, currentBranches) {
        let lastR = currentReleases ? currentReleases.release : -1;
        let lastRC = currentReleases ? currentReleases.releaseCandidate : -1;;

        currentBranches.forEach(branch => {
            if (this.#validateNameFormat(branch)) {
                const { type, number } = this.#getBranchData(branch);
                if (type === 'r') {
                    lastR = getHigher(lastR, number);
                    return;
                }
                lastRC = getHigher(lastRC, number);
            }
        });

        this.#obtainReleases(lastR, lastRC);
    }

    #validateNameFormat({ name }) {
        return name.match(r_regex) || name.match(rc_regex);
    }

    #getBranchData({ name }) {
        const branchName = name.match(text_numbers_regex);
        return { type: branchName[0], number: parseInt(branchName[1]) };
    }

    #obtainReleases(lastR, lastRC) {
        const release = (lastR !== -1) ? lastR : null;
        const releaseCandidate = (lastRC !== -1 && lastR - 1 === lastRC) ? lastRC : null;
        this.#releases = new Releases(release, releaseCandidate);
    }
}