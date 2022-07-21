import Repository from "../models/repository.js";

export default function initAnalyzer(parLength, path = null) {

    let rep = null;

    switch (parLength) {
        case 2:
            rep = new Repository();
            break;
        case 3:
            rep = new Repository(path);
            break;
        default:
            console.log("Too many arguments were given\n");
    }

    rep ? rep.showRepositoryReleases() : console.log("Failed to execute analyzer\n");

}