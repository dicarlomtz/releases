import { text_numbers_regex, loadJSON, getHigher } from "../helpers/helpers.js";
import Releases from "./releases.js";

const DEFAULT_FILE_PATH = 'src/data/branches.json';

const r_regex = new RegExp("^r[0-9]+$");
const rc_regex = new RegExp("^rc[0-9]+$");

export default class Repository {
    constructor(file_path = DEFAULT_FILE_PATH) {
        try {
            this["#branches"] = loadJSON(file_path);
            this["#releases"] = null;

            this.#analyzeBranches(this["#releases"], this["#branches"]);
        } catch (err) {
            console.log('Unable to read the file due to\n' + err.message);
        }
    }

    showRepositoryReleases() {
        this["#releases"] ? this["#releases"].showReleases() : 'There are not r and rc for this repository\n';
    }

    addBranches(branches) {
        this.#analyzeBranches(this["#releases"], branches);
    }

    #analyzeBranches(currentReleases, currentBranches) {
        let lastR = currentReleases ? currentReleases.release : null;
        let lastRC = currentReleases ? currentReleases.releaseCandidate : null;

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

    // Validates name format: rc123, r321, rc1233, r3333, etc.
    #validateNameFormat({ name }) {
        if (!name) throw new Error("Invalid JSON format 'name' field is required");
        return name.match(r_regex) || name.match(rc_regex);
    }

    // Separates text and numbers. rc123 -> [rc, 123]
    #getBranchData({ name }) {
        const branchName = name.match(text_numbers_regex);
        return { type: branchName[0], number: branchName[1] };
    }

    #obtainReleases(lastR, lastRC) {
        const release = lastR ? lastR : null;
        const releaseCandidate = (lastRC && parseInt(lastR) + 1 === parseInt(lastRC)) ? lastRC : null;
        this["#releases"] = new Releases(release, releaseCandidate);
    }
}