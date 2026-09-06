"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChallengeHeader } from "@/components/lab/challenge-header";
import { ChallengeResult } from "@/components/lab/challenge-result";
import { INTERVIEW_QUIZZES, type InterviewQuiz } from "@/content/lab/interview";
import { useLabChallengeParam, useSelectedId } from "@/lib/lab/params";
import { recordLabResult } from "@/lib/lab/storage";
import { cn } from "@/lib/utils";

export function InterviewStudio() {
  const fromUrl = useLabChallengeParam();
  const { id, setId } = useSelectedId(INTERVIEW_QUIZZES[0]?.id ?? "", fromUrl);
  const quiz = INTERVIEW_QUIZZES.find((item) => item.id === id) ?? INTERVIEW_QUIZZES[0];
  if (!quiz) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {INTERVIEW_QUIZZES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={cn(
              "border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]",
              item.id === quiz.id
                ? "border-accent text-foreground"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <InterviewBoard key={quiz.id} quiz={quiz} />
    </div>
  );
}

function InterviewBoard({ quiz }: { quiz: InterviewQuiz }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const correctCount = quiz.questions.filter((item) => answers[item.id] === item.correct).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);

  function submit() {
    setDone(true);
    recordLabResult({
      experienceId: "interview",
      challengeId: quiz.id,
      score,
      maxScore: 100,
    });
  }

  return (
    <div>
      <ChallengeHeader
        kicker={quiz.category}
        title={quiz.title}
        description={quiz.description}
        difficulty={quiz.level}
      />

      <ol className="space-y-6">
        {quiz.questions.map((question, index) => (
          <li key={question.id} className="border border-border p-4">
            <p className="text-sm text-foreground">
              <span className="font-mono text-muted-dim">{index + 1}.</span> {question.prompt}
            </p>
            <fieldset className="mt-3 space-y-2" disabled={done}>
              <legend className="sr-only">Question {index + 1}</legend>
              {question.options.map((option) => (
                <label key={option.id} className="flex items-start gap-2 text-sm text-muted">
                  <input
                    type="radio"
                    name={question.id}
                    checked={answers[question.id] === option.id}
                    onChange={() =>
                      setAnswers((current) => ({ ...current, [question.id]: option.id }))
                    }
                    className="mt-1"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>
            {done ? <p className="mt-3 text-sm text-muted">{question.explanation}</p> : null}
          </li>
        ))}
      </ol>

      <div className="mt-6">
        <Button
          type="button"
          variant="hairline"
          disabled={done || Object.keys(answers).length < quiz.questions.length}
          onClick={submit}
        >
          Score interview
        </Button>
      </div>

      {done ? (
        <div className="mt-8">
          <ChallengeResult
            experience="Engineering Interview"
            challenge={quiz.title}
            score={score}
            maxScore={100}
            path="/lab/interview/"
            note={`${correctCount} / ${quiz.questions.length} correct. Explanations are above.`}
          />
        </div>
      ) : null}
    </div>
  );
}
