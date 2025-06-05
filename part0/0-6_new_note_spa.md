``` mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTML status code 201 Created
    deactivate server

       Note right of browser: The browser stays on the same page and does not send further requests