# fractal-graph-generator

🇧🇷 Português | 🇺🇸 [English](README.en.md)

> Um gerador de grafos hierárquicos com visualização fractal auto-similar, em JavaScript puro sobre Canvas 2D.

## Visão geral

**fractal-graph-generator** renderiza grafos hierárquicos com uma estética **fractal**: cada nó filho é desenhado proporcionalmente menor que o pai (escala de 1/4) e posicionado em círculo ao seu redor, produzindo uma estrutura auto-similar de "zoom infinito". Construído em **JavaScript vanilla** sobre **Canvas 2D**, sem dependências externas.

![start](https://user-images.githubusercontent.com/18644558/217813865-5f6c59a0-8a34-4a0f-89ab-3545e8336bb2.png)

## Como funciona

- **`No` (nó)** — cada nó guarda posição, alvo (`target`), tamanho, ângulo relativo ao pai, lista de `parents` e `children`. O tamanho de um filho é o do pai dividido por 4 (a razão fractal).
- **`Trilha`** — container que inicializa o nó raiz.
- **Posicionamento polar** — os filhos são distribuídos em círculo ao redor do pai; o ângulo de cada um é `360 / (nº de filhos + 1)`, e a coordenada é calculada por trigonometria (`x = raio·cos(θ) + pai.x`).
- **Animação suave** — a posição de cada nó interpola em direção ao seu `target`, e a câmera também interpola (lerp) ao focar um nó, criando *pan/zoom* fluido via `requestAnimationFrame`.
- **Profundidade visual** — a opacidade das arestas diminui com a geração, dando sensação de profundidade.
- **Culling** — nós fora da tela ou pequenos demais não são desenhados.
- **Suporte a múltiplos pais** — a estrutura permite DAGs (não só árvores) via `insertParents()`.

## Como executar

É **browser puro** — não precisa de servidor. Basta abrir `index.html` no navegador. Depois, use o **console do navegador** para construir grafos:

```javascript
// Inserir um filho na raiz:
TRILHA.main.insertChildren({ x: 0, y: 0 })

// Gerar um grafo fractal pré-fabricado (recursivo):
build(TRILHA.main)
```

![fractal](https://user-images.githubusercontent.com/18644558/217813851-a397aedf-5023-4244-9238-c1c28aab2b88.png)

**Interação visual:** mover o mouse mapeia a posição no espaço do grafo; clicar em um nó faz a câmera dar *zoom* nele (clicar de novo volta ao pai).

## Estado do projeto

Protótipo funcional. As classes e o *render loop* funcionam; *pan/zoom*, posicionamento e culling estão implementados. Limitações conhecidas:

- A construção é feita via console — não há UI (botões/sliders).
- Arestas só são desenhadas para o primeiro pai (`parents[0]`), apesar de a estrutura suportar múltiplos.
- Sem persistência (salvar/carregar) nem exportação (PNG/SVG/JSON).
- Cores fixas; uso de variáveis globais (`TRILHA`, `mouse`, etc.).

## Licença

Este projeto ainda não declara uma licença; até que uma seja adicionada, todos os direitos são reservados ao autor.
