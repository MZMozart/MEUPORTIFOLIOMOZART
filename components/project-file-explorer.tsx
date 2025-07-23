"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Folder,
  FolderOpen,
  File,
  ChevronRight,
  ChevronDown,
  Code,
  FileText,
  ImageIcon,
  Settings,
  Database,
  Globe,
  Copy,
} from "lucide-react"

interface FileNode {
  name: string
  type: "file" | "folder"
  path: string
  content?: string
  language?: string
  children?: FileNode[]
  expanded?: boolean
}

interface ProjectFileExplorerProps {
  project: {
    name: string
    language: string
    clone_url: string
    html_url: string
    default_branch: string
  }
}

export default function ProjectFileExplorer({ project }: ProjectFileExplorerProps) {
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [loading, setLoading] = useState(false)

  // Gera estrutura de arquivos baseada na linguagem
  const generateFileStructure = (language: string, projectName: string): FileNode[] => {
    const structures: { [key: string]: FileNode[] } = {
      JavaScript: [
        {
          name: "src",
          type: "folder",
          path: "src",
          expanded: true,
          children: [
            {
              name: "index.js",
              type: "file",
              path: "src/index.js",
              language: "javascript",
              content: `// ${projectName} - Arquivo principal
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo ao ${projectName}!',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(\`🚀 Servidor rodando na porta \${PORT}\`);
});`,
            },
            {
              name: "app.js",
              type: "file",
              path: "src/app.js",
              language: "javascript",
              content: `// ${projectName} - Configuração da aplicação
import { createApp } from './config/app.js';
import { connectDatabase } from './config/database.js';
import { setupRoutes } from './routes/index.js';

class Application {
  constructor() {
    this.app = createApp();
    this.init();
  }

  async init() {
    try {
      await this.setupDatabase();
      this.setupRoutes();
      this.startServer();
    } catch (error) {
      console.error('❌ Erro ao inicializar aplicação:', error);
      process.exit(1);
    }
  }

  async setupDatabase() {
    await connectDatabase();
    console.log('✅ Banco de dados conectado');
  }

  setupRoutes() {
    setupRoutes(this.app);
    console.log('✅ Rotas configuradas');
  }

  startServer() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(\`🚀 \${process.env.APP_NAME || '${projectName}'} rodando na porta \${PORT}\`);
    });
  }
}

new Application();`,
            },
            {
              name: "components",
              type: "folder",
              path: "src/components",
              children: [
                {
                  name: "Header.js",
                  type: "file",
                  path: "src/components/Header.js",
                  language: "javascript",
                  content: `// Componente Header
export default function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">Sobre</a></li>
            <li><a href="/contact">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}`,
                },
              ],
            },
            {
              name: "utils",
              type: "folder",
              path: "src/utils",
              children: [
                {
                  name: "helpers.js",
                  type: "file",
                  path: "src/utils/helpers.js",
                  language: "javascript",
                  content: `// Funções utilitárias
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const validateEmail = (email) => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};`,
                },
              ],
            },
          ],
        },
        {
          name: "package.json",
          type: "file",
          path: "package.json",
          language: "json",
          content: `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, "-")}",
  "version": "1.0.0",
  "description": "Projeto ${projectName}",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "build": "npm run clean && babel src -d dist",
    "clean": "rm -rf dist",
    "test": "jest",
    "lint": "eslint src/**/*.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "eslint": "^8.45.0"
  },
  "keywords": ["javascript", "node", "express"],
  "author": "Gabriel Tamais Fischer",
  "license": "MIT"
}`,
        },
        {
          name: "README.md",
          type: "file",
          path: "README.md",
          language: "markdown",
          content: `# ${projectName}

## 📋 Descrição
Projeto desenvolvido em JavaScript/Node.js

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
\`\`\`bash
# Clone o repositório
git clone ${project.clone_url}

# Entre na pasta do projeto
cd ${project.name}

# Instale as dependências
npm install

# Execute o projeto
npm start
\`\`\`

### Desenvolvimento
\`\`\`bash
# Execute em modo desenvolvimento
npm run dev
\`\`\`

## 📁 Estrutura do Projeto
\`\`\`
src/
├── index.js          # Arquivo principal
├── app.js           # Configuração da aplicação
├── components/      # Componentes reutilizáveis
└── utils/          # Funções utilitárias
\`\`\`

## 🛠️ Tecnologias
- JavaScript
- Node.js
- Express.js

## 👨‍💻 Autor
Gabriel Tamais Fischer`,
        },
        {
          name: ".gitignore",
          type: "file",
          path: ".gitignore",
          language: "text",
          content: `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db`,
        },
      ],
      TypeScript: [
        {
          name: "src",
          type: "folder",
          path: "src",
          expanded: true,
          children: [
            {
              name: "index.ts",
              type: "file",
              path: "src/index.ts",
              language: "typescript",
              content: `// ${projectName} - Arquivo principal TypeScript
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

interface ServerConfig {
  port: number;
  environment: string;
}

class Server {
  private app: Application;
  private config: ServerConfig;

  constructor() {
    this.app = express();
    this.config = {
      port: Number(process.env.PORT) || 3000,
      environment: process.env.NODE_ENV || 'development'
    };
    
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        message: 'Bem-vindo ao ${projectName}!',
        version: '1.0.0',
        environment: this.config.environment,
        timestamp: new Date().toISOString()
      });
    });

    this.app.get('/api/health', (req: Request, res: Response) => {
      res.json({ 
        status: 'OK', 
        uptime: process.uptime(),
        timestamp: new Date().toISOString() 
      });
    });
  }

  public start(): void {
    this.app.listen(this.config.port, () => {
      console.log(\`🚀 Servidor TypeScript rodando na porta \${this.config.port}\`);
      console.log(\`📍 Ambiente: \${this.config.environment}\`);
    });
  }
}

const server = new Server();
server.start();`,
            },
            {
              name: "types",
              type: "folder",
              path: "src/types",
              children: [
                {
                  name: "index.ts",
                  type: "file",
                  path: "src/types/index.ts",
                  language: "typescript",
                  content: `// Tipos globais do projeto
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export type Environment = 'development' | 'production' | 'test';

export interface ServerConfig {
  port: number;
  environment: Environment;
  database: DatabaseConfig;
}`,
                },
              ],
            },
          ],
        },
        {
          name: "package.json",
          type: "file",
          path: "package.json",
          language: "json",
          content: `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, "-")}",
  "version": "1.0.0",
  "description": "Projeto ${projectName} em TypeScript",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "clean": "rm -rf dist",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/cors": "^2.8.13",
    "@types/node": "^20.4.5",
    "typescript": "^5.1.6",
    "ts-node-dev": "^2.0.0",
    "@typescript-eslint/eslint-plugin": "^6.2.1",
    "@typescript-eslint/parser": "^6.2.1",
    "eslint": "^8.45.0"
  },
  "keywords": ["typescript", "node", "express"],
  "author": "Gabriel Tamais Fischer",
  "license": "MIT"
}`,
        },
        {
          name: "tsconfig.json",
          type: "file",
          path: "tsconfig.json",
          language: "json",
          content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}`,
        },
      ],
      React: [
        {
          name: "src",
          type: "folder",
          path: "src",
          expanded: true,
          children: [
            {
              name: "App.jsx",
              type: "file",
              path: "src/App.jsx",
              language: "javascript",
              content: `// ${projectName} - Componente principal React
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    const fetchData = async () => {
      try {
        setLoading(true);
        // Aqui você faria a chamada para sua API
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Header title="${projectName}" />
      
      <main className="main-content">
        <section className="hero">
          <h1>Bem-vindo ao ${projectName}</h1>
          <p>Uma aplicação React moderna e responsiva</p>
        </section>

        <section className="content">
          {loading ? (
            <div className="loading">
              <p>Carregando...</p>
            </div>
          ) : (
            <div className="data-container">
              <h2>Dados da Aplicação</h2>
              {data.length > 0 ? (
                <ul>
                  {data.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum dado encontrado</p>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;`,
            },
            {
              name: "index.js",
              type: "file",
              path: "src/index.js",
              language: "javascript",
              content: `// ${projectName} - Ponto de entrada da aplicação
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Configuração do React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hot Module Replacement (HMR) para desenvolvimento
if (module.hot) {
  module.hot.accept();
}`,
            },
            {
              name: "components",
              type: "folder",
              path: "src/components",
              children: [
                {
                  name: "Header.jsx",
                  type: "file",
                  path: "src/components/Header.jsx",
                  language: "javascript",
                  content: `// Componente Header React
import React from 'react';
import './Header.css';

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>{title}</h1>
        </div>
        
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">Sobre</a></li>
            <li><a href="/services">Serviços</a></li>
            <li><a href="/contact">Contato</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="btn-primary">
            Começar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;`,
                },
                {
                  name: "Footer.jsx",
                  type: "file",
                  path: "src/components/Footer.jsx",
                  language: "javascript",
                  content: `// Componente Footer React
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>${projectName}</h3>
            <p>Desenvolvido com React por Gabriel Tamais Fischer</p>
          </div>
          
          <div className="footer-section">
            <h4>Links Úteis</h4>
            <ul>
              <li><a href="/privacy">Privacidade</a></li>
              <li><a href="/terms">Termos</a></li>
              <li><a href="/support">Suporte</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contato</h4>
            <p>Email: contato@${projectName.toLowerCase()}.com</p>
            <p>Telefone: (11) 99999-9999</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} ${projectName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`,
                },
              ],
            },
            {
              name: "hooks",
              type: "folder",
              path: "src/hooks",
              children: [
                {
                  name: "useApi.js",
                  type: "file",
                  path: "src/hooks/useApi.js",
                  language: "javascript",
                  content: `// Hook customizado para chamadas de API
import { useState, useEffect } from 'react';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Erro na API:', err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  const refetch = () => {
    if (url) {
      fetchData();
    }
  };

  return { data, loading, error, refetch };
};`,
                },
              ],
            },
          ],
        },
        {
          name: "public",
          type: "folder",
          path: "public",
          children: [
            {
              name: "index.html",
              type: "file",
              path: "public/index.html",
              language: "html",
              content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="${projectName} - Aplicação React" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  <title>${projectName}</title>
</head>
<body>
  <noscript>Você precisa habilitar JavaScript para executar esta aplicação.</noscript>
  <div id="root"></div>
</body>
</html>`,
            },
          ],
        },
        {
          name: "package.json",
          type: "file",
          path: "package.json",
          language: "json",
          content: `{
  "name": "${projectName.toLowerCase().replace(/\s+/g, "-")}",
  "version": "1.0.0",
  "description": "Aplicação React - ${projectName}",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.4.0",
    "react-router-dom": "^6.14.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/**/*.{js,jsx}",
    "format": "prettier --write src/**/*.{js,jsx,css,md}"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "eslint": "^8.45.0",
    "prettier": "^3.0.0"
  },
  "keywords": ["react", "javascript", "frontend"],
  "author": "Gabriel Tamais Fischer",
  "license": "MIT"
}`,
        },
      ],
      Python: [
        {
          name: "src",
          type: "folder",
          path: "src",
          expanded: true,
          children: [
            {
              name: "main.py",
              type: "file",
              path: "src/main.py",
              language: "python",
              content: `#!/usr/bin/env python3
"""
${projectName} - Aplicação Python
Desenvolvido por Gabriel Tamais Fischer
"""

import os
import sys
from datetime import datetime
from typing import Dict, List, Optional

class ${projectName.replace(/\s+/g, "")}App:
    """Classe principal da aplicação ${projectName}"""
    
    def __init__(self):
        self.name = "${projectName}"
        self.version = "1.0.0"
        self.author = "Gabriel Tamais Fischer"
        self.start_time = datetime.now()
        
    def initialize(self) -> None:
        """Inicializa a aplicação"""
        print(f"🚀 Iniciando {self.name} v{self.version}")
        print(f"👨‍💻 Desenvolvido por {self.author}")
        print(f"⏰ Iniciado em: {self.start_time.strftime('%d/%m/%Y %H:%M:%S')}")
        print("-" * 50)
        
    def run(self) -> None:
        """Executa a aplicação principal"""
        try:
            self.initialize()
            self.main_loop()
        except KeyboardInterrupt:
            print("\\n⚠️  Aplicação interrompida pelo usuário")
        except Exception as e:
            print(f"❌ Erro na aplicação: {e}")
            sys.exit(1)
        finally:
            self.cleanup()
            
    def main_loop(self) -> None:
        """Loop principal da aplicação"""
        while True:
            self.show_menu()
            choice = input("\\nEscolha uma opção: ").strip()
            
            if choice == "1":
                self.process_data()
            elif choice == "2":
                self.show_statistics()
            elif choice == "3":
                self.export_data()
            elif choice == "0":
                print("👋 Encerrando aplicação...")
                break
            else:
                print("❌ Opção inválida! Tente novamente.")
                
    def show_menu(self) -> None:
        """Exibe o menu principal"""
        print("\\n" + "="*40)
        print(f"    {self.name.upper()}")
        print("="*40)
        print("1. Processar dados")
        print("2. Mostrar estatísticas")
        print("3. Exportar dados")
        print("0. Sair")
        print("="*40)
        
    def process_data(self) -> None:
        """Processa dados da aplicação"""
        print("\\n📊 Processando dados...")
        # Implementar lógica de processamento
        print("✅ Dados processados com sucesso!")
        
    def show_statistics(self) -> None:
        """Mostra estatísticas da aplicação"""
        uptime = datetime.now() - self.start_time
        print("\\n📈 Estatísticas da Aplicação:")
        print(f"   • Tempo de execução: {uptime}")
        print(f"   • Versão: {self.version}")
        print(f"   • Desenvolvedor: {self.author}")
        
    def export_data(self) -> None:
        """Exporta dados para arquivo"""
        filename = f"{self.name.lower().replace(' ', '_')}_export.txt"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(f"Exportação do {self.name}\\n")
            f.write(f"Data: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\\n")
            f.write(f"Versão: {self.version}\\n")
        print(f"✅ Dados exportados para: {filename}")
        
    def cleanup(self) -> None:
        """Limpeza final da aplicação"""
        print("🧹 Limpando recursos...")
        print("✅ Aplicação finalizada com sucesso!")

if __name__ == "__main__":
    app = ${projectName.replace(/\s+/g, "")}App()
    app.run()`,
            },
            {
              name: "utils",
              type: "folder",
              path: "src/utils",
              children: [
                {
                  name: "helpers.py",
                  type: "file",
                  path: "src/utils/helpers.py",
                  language: "python",
                  content: `"""
Funções utilitárias para ${projectName}
"""

import json
import csv
import os
from datetime import datetime
from typing import Any, Dict, List, Optional

def format_date(date: datetime, format_str: str = "%d/%m/%Y") -> str:
    """Formata uma data para string"""
    return date.strftime(format_str)

def format_currency(value: float, currency: str = "BRL") -> str:
    """Formata um valor monetário"""
    if currency == "BRL":
        return f"R$ {value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"{value:,.2f}"

def validate_email(email: str) -> bool:
    """Valida um endereço de email"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def read_json_file(filepath: str) -> Optional[Dict]:
    """Lê um arquivo JSON"""
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {filepath}")
        return None
    except json.JSONDecodeError:
        print(f"❌ Erro ao decodificar JSON: {filepath}")
        return None

def write_json_file(filepath: str, data: Dict) -> bool:
    """Escreve dados em um arquivo JSON"""
    try:
        with open(filepath, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"❌ Erro ao escrever arquivo: {e}")
        return False

def read_csv_file(filepath: str) -> List[Dict]:
    """Lê um arquivo CSV"""
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            return list(reader)
    except FileNotFoundError:
        print(f"❌ Arquivo não encontrado: {filepath}")
        return []

def create_directory(path: str) -> bool:
    """Cria um diretório se não existir"""
    try:
        os.makedirs(path, exist_ok=True)
        return True
    except Exception as e:
        print(f"❌ Erro ao criar diretório: {e}")
        return False

def log_message(message: str, level: str = "INFO") -> None:
    """Registra uma mensagem de log"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [{level}] {message}")`,
                },
              ],
            },
          ],
        },
        {
          name: "requirements.txt",
          type: "file",
          path: "requirements.txt",
          language: "text",
          content: `# ${projectName} - Dependências Python
requests==2.31.0
pandas==2.0.3
numpy==1.24.3
python-dotenv==1.0.0
click==8.1.6
colorama==0.4.6
tqdm==4.65.0
pytest==7.4.0
black==23.7.0
flake8==6.0.0`,
        },
      ],
      default: [
        {
          name: "src",
          type: "folder",
          path: "src",
          expanded: true,
          children: [
            {
              name: "main.txt",
              type: "file",
              path: "src/main.txt",
              language: "text",
              content: `${projectName}

Este é um projeto de exemplo.
Desenvolvido por Gabriel Tamais Fischer.

Para mais informações, consulte o README.md`,
            },
          ],
        },
        {
          name: "README.md",
          type: "file",
          path: "README.md",
          language: "markdown",
          content: `# ${projectName}

## Descrição
Projeto desenvolvido por Gabriel Tamais Fischer.

## Como usar
1. Clone o repositório
2. Siga as instruções específicas da tecnologia
3. Execute o projeto

## Autor
Gabriel Tamais Fischer`,
        },
      ],
    }

    return structures[language] || structures.default
  }

  useEffect(() => {
    const structure = generateFileStructure(project.language, project.name)
    setFileTree(structure)
    // Seleciona o primeiro arquivo por padrão
    const firstFile = findFirstFile(structure)
    if (firstFile) {
      setSelectedFile(firstFile)
    }
  }, [project])

  const findFirstFile = (nodes: FileNode[]): FileNode | null => {
    for (const node of nodes) {
      if (node.type === "file") {
        return node
      }
      if (node.children) {
        const found = findFirstFile(node.children)
        if (found) return found
      }
    }
    return null
  }

  const toggleFolder = (path: string) => {
    const updateTree = (nodes: FileNode[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.path === path && node.type === "folder") {
          return { ...node, expanded: !node.expanded }
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) }
        }
        return node
      })
    }
    setFileTree(updateTree(fileTree))
  }

  const selectFile = (file: FileNode) => {
    if (file.type === "file") {
      setSelectedFile(file)
    }
  }

  const getFileIcon = (node: FileNode) => {
    if (node.type === "folder") {
      return node.expanded ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />
    }

    const extension = node.name.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        return <Code className="w-4 h-4 text-yellow-500" />
      case "json":
        return <Settings className="w-4 h-4 text-green-500" />
      case "md":
        return <FileText className="w-4 h-4 text-blue-500" />
      case "py":
        return <Code className="w-4 h-4 text-blue-600" />
      case "html":
        return <Globe className="w-4 h-4 text-orange-500" />
      case "css":
        return <Code className="w-4 h-4 text-blue-400" />
      case "sql":
        return <Database className="w-4 h-4 text-purple-500" />
      case "txt":
        return <FileText className="w-4 h-4 text-gray-500" />
      default:
        return <ImageIcon className="w-4 h-4 text-gray-400" />
    }
  }

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.path}>
        <div
          className={`flex items-center gap-2 py-1 px-2 hover:bg-muted/50 cursor-pointer rounded text-sm ${
            selectedFile?.path === node.path ? "bg-purple-500/20 text-purple-400" : "text-foreground"
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.path)
            } else {
              selectFile(node)
            }
          }}
        >
          {node.type === "folder" && (
            <span className="w-4 h-4 flex items-center justify-center">
              {node.expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </span>
          )}
          {getFileIcon(node)}
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === "folder" && node.expanded && node.children && (
          <div>{renderFileTree(node.children, depth + 1)}</div>
        )}
      </div>
    ))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getLanguageForHighlight = (language?: string) => {
    const langMap: { [key: string]: string } = {
      javascript: "javascript",
      typescript: "typescript",
      python: "python",
      json: "json",
      html: "html",
      css: "css",
      markdown: "markdown",
      text: "text",
    }
    return langMap[language || "text"] || "text"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* File Explorer */}
      <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
            <Folder className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-foreground">Explorador</h3>
          </div>
          <div className="overflow-y-auto max-h-[500px] text-sm">{renderFileTree(fileTree)}</div>
        </CardContent>
      </Card>

      {/* Code Editor */}
      <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-gray-800">
        <CardContent className="p-0">
          {selectedFile ? (
            <>
              {/* File Tab */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/50">
                <div className="flex items-center gap-2">
                  {getFileIcon(selectedFile)}
                  <span className="font-medium text-foreground">{selectedFile.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedFile.language || "text"}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(selectedFile.content || "")}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              {/* Code Content */}
              <div className="p-4 bg-gray-950 text-gray-100 font-mono text-sm overflow-auto max-h-[500px]">
                <pre className="whitespace-pre-wrap">
                  <code className={`language-${getLanguageForHighlight(selectedFile.language)}`}>
                    {selectedFile.content}
                  </code>
                </pre>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Selecione um arquivo para visualizar</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
