export function fetchSchools() {
    const url = `https://data.cityofnewyork.us/resource/97mf-9njv.json`;
    // const url = 'http://localhost:5000/resource/97mf-9njv.json';
    return fetch(url)
        .then(res => res.json());
}

export function fetchSchoolSAT(schoolId) {
    const url = `https://data.cityofnewyork.us/resource/734v-jeq5.json?dbn=${schoolId}`;
    // const url = `http://localhost:5000/resource/734v-jeq5.json?dbn=${schoolId}`;
    return fetch(url)
        .then(res => res.json())
        .then(res => (res.length) ? res[0] : null);
}
