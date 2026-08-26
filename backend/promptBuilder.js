/**
 * AuraSketch AI - Deterministic Prompt Builder for FLUX.1 Schnell
 * Concise, high-signal prompt strictly engineered for authentic hand-drawn graphite pencil sketches.
 * Eliminates AI artifacts, digital smoothing, and photo-like rendering.
 */

function construirPromptFlux(respostas) {
  const mapGenero = {
    "Homens": "man",
    "Mulheres": "woman",
    "Sem restrição de género": "person"
  };

  const mapEtnia = {
    "Latina / Miscigenada": "Latina / Hispanic",
    "Afrodescendente": "Black / Afro-descendant",
    "Caucasiana / Europeia": "Caucasian",
    "Asiática": "East Asian",
    "Indígena / Nativa": "Indigenous",
    "Sem preferência": "attractive"
  };

  const mapOlhar = {
    "Olhar doce e acolhedor": "warm gentle welcoming eyes",
    "Olhar penetrante e misterioso": "deep piercing mysterious gaze",
    "Olhar expressivo e bem-humorado": "expressive smiling eyes",
    "Olhar sereno e confiante": "calm confident serene eyes"
  };

  const mapEstilo = {
    "Clássico e sofisticado": "sophisticated classic look",
    "Despojado e casual": "casual minimalist look",
    "Artístico / Alternativo": "artistic bohemian look",
    "Esportivo / Atleta": "athletic look",
    "Intelectual e minimalista": "intellectual minimalist look"
  };

  const genero = mapGenero[respostas.genero_interesse] || mapGenero[respostas.atracao_genero] || "person";
  const etnia = mapEtnia[respostas.etnia] || mapEtnia[respostas.descendencia] || "attractive";
  const olhar = mapOlhar[respostas.olhar] || mapOlhar[respostas.traco_olhar] || "gentle eyes";
  const estilo = mapEstilo[respostas.estilo] || mapEstilo[respostas.estilo_visual] || "casual look";
  
  let idade = "28 years old";
  if (respostas.faixa_etaria) {
    const rawFaixa = respostas.faixa_etaria.replace(' anos', '').replace('+', ' and older');
    idade = `${rawFaixa} years old`;
  }

  // Concise, direct instruction for authentic hand-drawn graphite pencil drawing
  return `Authentic hand-drawn graphite pencil sketch of a ${idade} ${etnia} ${genero}, ${olhar}, ${estilo}, fine graphite lines, pencil crosshatching, charcoal shading, on textured cotton paper, realistic hand-drawn portrait drawing masterpiece.`;
}

module.exports = {
  construirPromptFlux
};
