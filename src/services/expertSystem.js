/**
 * Certainty Factor (CF) Expert System Engine
 * 
 * Formula for Rule CF:
 * CF(rule) = MB - MD
 * 
 * Formula for Consequent CF (because User CF = 1.0 implicitly from Radio/Select inputs):
 * CF(consequent) = CF(rule) * CF(user) = CF(rule)
 * 
 * Formula for combining multiple rules pointing to the same hypothesis:
 * If CF1 >= 0 and CF2 >= 0:
 *   CF_combine = CF1 + CF2 * (1 - CF1)
 * If CF1 < 0 and CF2 < 0:
 *   CF_combine = CF1 + CF2 * (1 + CF1)
 * If mixed:
 *   CF_combine = (CF1 + CF2) / (1 - min(|CF1|, |CF2|))
 */

export const evaluateCertaintyFactor = (userAnswers, rulesData) => {
  const { hypotheses, rules, defaultResult } = rulesData;
  const cfResults = {}; // { hypothesisId: { cf: number, reasons: string[] } }

  // 1. Evaluate each rule
  rules.forEach(rule => {
    // Check if ALL conditions in the rule are met by userAnswers (AND logic)
    let isMatch = true;
    for (const condition of rule.conditions) {
      if (userAnswers[condition.questionId] !== condition.value) {
        isMatch = false;
        break;
      }
    }

    // 2. If matched, calculate CF_rule and combine with existing CF for that hypothesis
    if (isMatch) {
      const cfRule = rule.mb - rule.md;
      const hId = rule.hypothesisId;

      if (!cfResults[hId]) {
        cfResults[hId] = { cf: cfRule, reasons: [rule.reasoning] };
      } else {
        // Combine CF
        const cfOld = cfResults[hId].cf;
        const cfNew = cfRule;
        let cfCombine = 0;

        if (cfOld >= 0 && cfNew >= 0) {
          cfCombine = cfOld + cfNew * (1 - cfOld);
        } else if (cfOld < 0 && cfNew < 0) {
          cfCombine = cfOld + cfNew * (1 + cfOld);
        } else {
          cfCombine = (cfOld + cfNew) / (1 - Math.min(Math.abs(cfOld), Math.abs(cfNew)));
        }

        cfResults[hId].cf = cfCombine;
        // Only add reason if it's not duplicate, though in our JSON each rule has unique reasoning
        if (!cfResults[hId].reasons.includes(rule.reasoning)) {
          cfResults[hId].reasons.push(rule.reasoning);
        }
      }
    }
  });

  // 3. Rank results based on CF score
  const rankedResults = Object.keys(cfResults).map(hId => {
    const hypothesis = hypotheses.find(h => h.id === hId);
    return {
      hypothesisId: hId,
      jurusan: hypothesis ? hypothesis.jurusan : 'Unknown',
      beasiswa: hypothesis ? hypothesis.beasiswa : 'Umum',
      skor: Math.round(cfResults[hId].cf * 100),
      alasan: cfResults[hId].reasons.join(' '), // Combine reasons into one paragraph
      rawCf: cfResults[hId].cf
    };
  }).sort((a, b) => b.rawCf - a.rawCf); // Descending sort

  // 4. Return top result or fallback to default if no rules matched
  if (rankedResults.length > 0 && rankedResults[0].skor > 0) {
    return rankedResults[0];
  } else {
    return defaultResult;
  }
};
