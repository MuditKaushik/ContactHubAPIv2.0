export module Contact {
    export interface IContactFilterModel {
        criteria: string;
        searchTerm: string;
    }
    export interface IContactModel {
        _id: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
        gender: string;
    }
}