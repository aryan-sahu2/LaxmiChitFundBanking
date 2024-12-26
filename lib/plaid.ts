import {Configuration, PlaidApi, PlaidEnvironments} from "plaid"

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        }
    }
})


export const plaidClient = new PlaidApi(configuration)


// for every third party integrations, we usually come to the lib folder, create a client of the tool and expose an API(the client) to be used in our code