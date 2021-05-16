export interface InitVisitorRequest {
    clientUrl: string;
    referrer: string | null;
    ym_clientID: string | null;
    visitor_id: string | null;
    last_visit: string | null;
}

export interface Visitor {
    visitor_id: string;
    last_visit: string;
}
