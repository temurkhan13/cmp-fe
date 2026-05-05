import useGrammarFix from './AiFeatureHooks/useGrammarFix';
import useImproveWriting from './AiFeatureHooks/useImproveWriting';
import useSummarize from './AiFeatureHooks/useSummarize';
import useExplain from './AiFeatureHooks/useExplain';
import useChangeTone from './AiFeatureHooks/useChangeTone';
import useAuto from './AiFeatureHooks/useAuto';
import useShorter from './AiFeatureHooks/useShorter';
import useLonger from './AiFeatureHooks/useLonger';
import useComprehensive from './AiFeatureHooks/useComprehensive';

const useAiTextActions = () => {
  const { fixGrammar } = useGrammarFix();
  const { improveWriting } = useImproveWriting();
  const { summarize } = useSummarize();
  const { Explain } = useExplain();
  const { ChangeToneFun } = useChangeTone();
  const { autoWritingFnc } = useAuto();
  const { shortText } = useShorter();
  const { LongText } = useLonger();
  const { comprehensiveWriting } = useComprehensive();

  const askAi = async (value, text) => {
    if (value === 'Fix Spelling & Grammar') return fixGrammar(text);
    if (value === 'Improve Writing') return improveWriting(text);
    if (value === 'Summarize') return summarize(text);
    if (value === 'Explain This') return Explain(text);
    return null;
  };

  const changeTone = (tone, text) => ChangeToneFun(text, tone);

  const changeLength = async (value, text) => {
    if (value === 'Auto') return autoWritingFnc(text);
    if (value === 'Small') return shortText(text);
    if (value === 'Medium') return LongText(text);
    if (value === 'Comprehensive') return comprehensiveWriting(text);
    return null;
  };

  return { askAi, changeTone, changeLength };
};

export default useAiTextActions;
