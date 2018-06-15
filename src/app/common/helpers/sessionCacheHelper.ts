export class SessionCacheHelper {

    static setGridData(name: String, data: any) {
        sessionStorage.setItem(name + '.GridData', JSON.stringify(data));
    }
    static getGridData(name: String) {
        return JSON.parse(sessionStorage.getItem(name + '.GridData'));
    }
}
