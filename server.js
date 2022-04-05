const express = require("express")
const server = express()
const { Client } = require("@notionhq/client")
const notion = new Client({auth:"secret_xA8Ak6VqPR3Amn7DWNmW41Z7BB5qZrHa2O3fg9FkNwq"})
server.use(express.static("public"))
server.get("/timer", async function (request, response) {
    let data = await notion.databases.query({ database_id: "c6f5dd4e30b441debab39f03fd4b878b" })
    data = data.results.map(i => i.properties)
    data = data.map(i => {
      return {
        h: i.ColorH.number,
        id: i.Id.title[0].plain_text,
        l: i.ColorL.number,
        s: i.ColorS.number,
        seconds: i.Seconds.number,
      }
    })
    response.json(data)
  })
  
server.listen(8080)