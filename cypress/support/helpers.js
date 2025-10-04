import { faker } from '@faker-js/faker'

/**
 * Gera dados dinâmicos para cadastro de usuário
 */
export function generateUserData() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    
    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({firstName, lastName, provider: 'automation.test'}),
        password: faker.internet.password({length: 12, memorable: false}),
        firstName: firstName,
        lastName: lastName,
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        country: 'Canada', // Mantém fixo para evitar problemas de seleção
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode('A#A #A#'), // Formato canadense
        mobileNumber: faker.phone.number('+1 ### ### ####')
    }
}

/**
 * Gera dados dinâmicos para formulário de contato
 */
export function generateContactData() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    
    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({firstName, lastName, provider: 'contact.test'}),
        subject: faker.lorem.sentence({min: 4, max: 8}).replace('.', ''),
        message: faker.lorem.paragraphs(2, '\n\n')
    }
}

/**
 * Gera email único com timestamp
 */
export function getRandomEmail() {
    const timestamp = new Date().getTime()
    return faker.internet.email({firstName: 'qa.tester', lastName: timestamp.toString(), provider: 'automation.test'})
}

/**
 * Gera número aleatório
 */
export function getRandomNumber() {
    return faker.number.int({ min: 100000, max: 999999 })
}

/**
 * Gera data de nascimento aleatória
 */
export function getRandomBirthDate() {
    const birthDate = faker.date.birthdate({ min: 18, max: 80, mode: 'age' })
    return {
        day: birthDate.getDate().toString(),
        month: birthDate.toLocaleString('en-US', { month: 'long' }),
        year: birthDate.getFullYear().toString()
    }
}