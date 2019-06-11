package at.willhaben.ppp.backend

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main(args: Array<String>) {
    embeddedServer(Netty, 8081, module = Application::mainModule) .start(wait = true)
}

fun Application.mainModule() {
    routing {
        get("/") {

            call.respondText("Hello World!")
        }
    }
}