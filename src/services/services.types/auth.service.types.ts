// export type AnalyticsListProps = {
//   cases: Array<{ cases: number; date: string }>;
//   recovered: Array<{ recovered: number; date: string }>;
//   deaths: { deaths: number; date: string }[];
// };

export type loginProps = {
  _id: string;
  role: string;
  customer_status: string;
  acceptedInvite: boolean;
  subscribedPlan: boolean;
  fullName: string;
  email: string;
  stripeData: string;
};

export enum Reference {
  Cases = 'cases',
  Recovered = 'recovered',
  Deaths = 'deaths',
}

export type AggregateRequestResponse = {
  // data: {
  _id: string;
  role: string;
  customer_status: string;
  acceptedInvite: boolean;
  subscribedPlan: boolean;
  fullName: string;
  email: string;
  stripeData: string;
  // };
  // status: number;
};

export type ReferenceResult = {
  [Reference.Cases]?: number;
  [Reference.Recovered]?: number;
  [Reference.Deaths]?: number;
  date: string;
};

export interface AnalyticsEntry {
  [key: string]: {
    [Reference.Cases]: number;
    [Reference.Deaths]: number;
    [Reference.Recovered]: number;
  };
}
