pipeline {
    agent none

    parameters {
        choice(
            name: 'MODE',
            choices: ['single', 'all', 'jdd', 'pom'],
            description: 'single = un seul fichier | all = tous les tests | jdd = tests pilotés par données | pom = tests Page Object Model'
        )
        choice(
            name: 'SPEC_FILE',
            choices: [
                'cypress/e2e/login.cy.js',
                'cypress/e2e/loginEnv.cy.js',
                'cypress/e2e/loginJddCsv.cy.js',
                'cypress/e2e/loginJddJson.cy.js',
                'cypress/e2e/loginPom.cy.js',
                'cypress/e2e/parcoursProduitOptimal.cy.js',
                'cypress/e2e/produit.cy.js',
                'cypress/e2e/testParcoursProduct.cy.js'
            ],
            description: 'Utilisé uniquement si MODE = single'
        )
    }

    stages {

        stage('Install dependencies') {
            agent {
                docker {
                    image 'cypress/included:14.5.4'
                    args '-u root:root --entrypoint=""'
                }
            }
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress test') {
            agent {
                docker {
                    image 'cypress/included:14.5.4'
                    args '-u root:root --entrypoint=""'
                }
            }
            steps {
                script {
                    def specArg = ''
                    switch (params.MODE) {
                        case 'single':
                            specArg = "--spec ${params.SPEC_FILE}"
                            break
                        case 'jdd':
                            specArg = '--spec "cypress/e2e/*Jdd*.cy.js"'
                            break
                        case 'pom':
                            specArg = '--spec "cypress/e2e/*Pom*.cy.js"'
                            break
                        case 'all':
                        default:
                            specArg = ''
                    }
                    sh "npx cypress run ${specArg}"
                }
            }
        }

        stage('Generate Mochawesome report') {
            agent {
                docker {
                    image 'cypress/included:14.5.4'
                    args '-u root:root --entrypoint=""'
                }
            }
            steps {
                sh 'npm run report:merge || true'
                sh 'npm run report:generate || true'
            }
        }

        stage('Generate Allure report') {
            agent any
            steps {
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                archiveArtifacts artifacts: 'cypress/reports/**, cypress/screenshots/**, cypress/videos/**, allure-results/**',
                                  allowEmptyArchive: true
            }
        }
    }

    post {
        failure {
            echo "Le build a échoué (MODE=${params.MODE}, SPEC_FILE=${params.SPEC_FILE})."
        }
    }
}