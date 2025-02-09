export interface Incident {
    id: string;
    incident_Date: string;
    type: string;
    severity: string;
    description?: string;
    actions_Taken?: string;
    test: {
      id: string;
      start_date: string;
      end_date?: string;
      status: string;
      client?: {
        first_name: string;
        last_name: string;
      };
      driver?: {
        firstName: string;
        lastName: string;
      };
      motorcycle: {
        brand: string;
        model: string;
      };
    };
  }
  
  export interface GetIncidentsByDealerData {
    incidentsByDealer: Incident[];
  }
  
  export interface GetIncidentsByCompanyData {
    incidentsByCompany: Incident[];
  }