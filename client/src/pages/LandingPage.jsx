/*
 * LandingPage.jsx  (route: /)
 * Public home page. Objectives shown: O1 (AI, ATS-friendly resumes) and O5
 * (less time, better shortlisting), deliverable D2 (UI/UX).
 * Sections: hero with live target demo -> features -> how it works (route map)
 * -> ATS checker preview -> final call to action.
 */
import Button from '../components/Button'
import HeroDemo from '../components/landing/HeroDemo'
import FeatureIndex from '../components/landing/FeatureIndex'
import RouteSteps from '../components/landing/RouteSteps'
import AtsTeaser from '../components/landing/AtsTeaser'

function LandingPage() {
  return (
    <>
      {/* Hero: the promise on the left, the live proof on the right */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:pt-14">
        <div>
          <h1 className="font-board text-[44px] leading-[1.02] font-bold tracking-[-0.01em] sm:text-[56px]">
            A resume written for the company you’re applying to
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            Enter your target company and job role first. The template, the AI-written draft, the section order,
            the keywords and the ATS check all follow that choice.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/signup" size="lg">
              Build my tailored resume
            </Button>
            <Button to="/templates" variant="secondary" size="lg">
              Browse templates
            </Button>
          </div>
          <p className="mt-4 text-sm text-ink-faint">Free to use. PDF download included.</p>
        </div>

        <HeroDemo />
      </section>

      <FeatureIndex />
      <RouteSteps />
      <AtsTeaser />

      {/* Final call to action */}
      <section className="on-navy bg-navy">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <h2 className="font-board max-w-xl text-4xl leading-tight font-bold text-white">
            Your next application deserves its own resume
          </h2>
          <Button to="/signup" variant="board" size="lg">
            Create my first resume
          </Button>
        </div>
      </section>
    </>
  )
}

export default LandingPage
