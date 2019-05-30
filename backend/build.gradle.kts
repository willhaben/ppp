plugins {
    java
    kotlin("jvm") version "1.3.31"
    kotlin("plugin.spring") version "1.3.31"
    id("io.spring.dependency-management") version "1.0.7.RELEASE"
    idea
}

java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}

dependencyManagement {
    dependencies {
        dependency("org.springframework.boot:spring-boot-starter-web:2.1.5.RELEASE")
    }
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation(kotlin("stdlib-jdk8"))
}

repositories {
    mavenCentral()
}
