plugins {
    java
    kotlin("jvm") version "1.3.31"
    idea
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}


dependencies {
    compile("io.ktor",  "ktor-server-netty", "1.2.1")
    runtime("org.slf4j:slf4j-simple:1.7.26")
    implementation(kotlin("stdlib-jdk8"))
}

repositories {
    mavenCentral()
}
