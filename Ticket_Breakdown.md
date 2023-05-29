# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

EPIC: Custom Id's for Agents

1.- Add new "userID" field to Agents Table.

Description: Currently the Agents table defines an id when a new Agent is added.
The user needs to be able to add custom id's for their Agents if needed. The Agents table should contain a new "UserID" column representing this personalized id.

Acceptance criteria:

- The Agents table contains a "UserID" column.
- The value of the string can contain letters or numbers only.
- Null values are accepted

Implementation Details:

- Add a new column called "UserID" to the Agents table in the DB

Effort:
1 Hour

2.- Add new field for userID modification on the platform UI.

Description: Currently the UI doesn't allow the user to add a custom ID for their agents.
The user needs to be able to add custom id's for their Agents if needed from the UI. This ID should be saved in the Agents table "UserID" column. Validation also needs to be performed. Write the neccessary unit tests.

Acceptance criteria:

- The user can add an ID for the Agents or the field can be left blank.
- If there is a value, it should contain only letters and/or numbers.
- If the validation fails an error message should be displayed to the user explaining the reason.
- If the validation succeeds the current success message shows as normal, and the value is saved in the Agents table "UserID" column.
- Tests pass

Implementation Details:

- Add a new field on the Agent form.
- Add error message template and show it only if validation fails
- onSubmit() should perform as normal but a new validation function for UserID should alse be executed. If validation fails show the error message.

Effort:
2 Hours

3.- Modify the Agent ID display value behavior in the UI.

Description: Currently when fetching the Agent to display it's data we show the row ID.
The user needs to see the custom ID if it is present. When fetching teh Agent data, show the custom ID if present, if not show the row id. Write the neccessary unit tests.

Acceptance criteria:

- If the Agent has a custom ID it is displayed in the UI
- If theres no custom ID the UI displays the table row id
- Tests pass

Implementation Details:

- when fetching the Agent data set id to `agent.UserID || agent.id`

Effort:
1 Hour

4.- Modify getShiftsByFacility function to include userID in Agent metadata.

Description: Currently this function already fetches Agent data from the DB and returns an agent metadata object with the result. This metadata includes an id which is the table row id. If a "UserID" value is present for an Agent, include that value in the meta object insted of the row id. Write the neccessary unit tests.

Acceptance criteria:

- If the Agent doesn't have a "UserID" the meta should show the row ID as ID.
- If the Agent has a "UserID" the meta shows the "UserID" as ID.
- Tests pass

Implementation Details:

- When retrieving the ID check if a "UserID" value is present, if so return that instead of the row id

Effort:
1 Hour
