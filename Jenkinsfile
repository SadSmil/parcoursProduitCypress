pipeline {
    agent {
        docker {
            image 'cypress/included:14.5.4'
            args '-u root:root --entrypoint=""'
        }
    }

    parameters {
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
            description: 'Fichier de test Cypress à exécuter'
        )
        choice(
            name: 'BRANCH',
            choices: ['main', 'bakri'],
            description: 'Branche Git à builder'
        )
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH}",
                    url: 'https://github.com/SadSmil/parcoursProduitCypress.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress test') {
            steps {
                sh "npx cypress run --spec ${params.SPEC_FILE}"
            }
        }

        stage('Generate Mochawesome report') {
            steps {
                sh 'npm run report:merge || true'
                sh 'npm run report:generate || true'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/**, cypress/screenshots/**, cypress/videos/**, allure-results/**',
                              allowEmptyArchive: true
        }
        failure {
            echo "Le test ${params.SPEC_FILE} a échoué sur la branche ${params.BRANCH}."
        }
    }
}
