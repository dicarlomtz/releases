import initAnalyzer from "../controllers/branchescontroller.js"

export default function analyze() {
    const parLength = process.argv.length;
    parLength >= 3 ? initAnalyzer(parLength, process.argv[2]) : initAnalyzer(parLength);
}