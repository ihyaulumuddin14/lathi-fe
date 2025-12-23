'use client'

import { gsap, useGSAP, ScrollTrigger } from "@/utils/gsap-util"

const Features = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const timeline = gsap.timeline()
    
    timeline.fromTo(".first-section", {
      scrollTrigger: {
        trigger: "#features",
        start: "top bottom",
        end: "33% top",
        scrub: true
      },
      scale: 0.9,
      yPercent: -100,
    }, {
      scrollTrigger: {
        trigger: "#features",
        start: "top bottom",
        end: "33% top",
        scrub: true
      },
      scale: 1,
      yPercent: 100,
      backgroundColor: "var(--foreground)",
      ease: "none",
    }).to(".first-section", {
      scrollTrigger: {
        trigger: "#features",
        start: "33% top",
        end: "bottom bottom",
        scrub: true,
        pin: true
      }
    })

  }, [])

  return (
    <section id="features" className="w-full h-[300vh] relative z-0">
      <div className="first-section section-wrapper bg-background origin-center scale-80 z-0"/>

      <div className="second-section relative section-wrapper bg-transparent z-1 text-primary-foreground p-[3vw] pt-20 text-justify">
        Features
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo porro beatae in fugit quibusdam obcaecati magni atque cum, earum eligendi reprehenderit esse ducimus natus. Ratione aliquam ipsum placeat impedit sapiente, adipisci incidunt quaerat nihil, nisi consequatur excepturi asperiores architecto amet reiciendis? Molestiae repudiandae temporibus repellat, expedita mollitia facilis alias nesciunt corporis optio, et nulla facere. Perspiciatis, corrupti. Dolore maiores repellat fugit esse, eligendi quod neque asperiores, rem perspiciatis placeat ipsum possimus voluptatum nulla veritatis mollitia illo deserunt dolorem. Fugiat atque, aut hic saepe, quae, provident repudiandae obcaecati sint corporis facere nobis vitae explicabo laudantium quasi rerum eum et! Facere sunt voluptatum nemo minus placeat adipisci a delectus sit aliquam! Excepturi quidem nisi alias dolor quos, eligendi sit adipisci pariatur cumque suscipit, perspiciatis doloribus soluta? Commodi, ducimus ex. Nulla architecto non, magni minus quam quas, officia rem, placeat aspernatur perferendis corrupti veritatis ullam! Quam facere, non incidunt illo fugit sit adipisci harum nesciunt quia numquam animi accusantium nihil, voluptatem consectetur dolor cupiditate id itaque ducimus quaerat? Quis laboriosam, aperiam sequi mollitia excepturi, dolore ex consequuntur ipsum pariatur, doloribus incidunt! Fugit, quae? Mollitia quod architecto necessitatibus, maxime numquam vitae eos ad consequuntur sunt accusantium quia ea incidunt? Earum cum odit placeat aliquam quod sed recusandae blanditiis alias deserunt sapiente! Unde, blanditiis perferendis quibusdam odio beatae aperiam ex neque quam harum incidunt ipsum tenetur, modi quasi dicta autem praesentium alias maiores ad, ullam eveniet! Placeat nam nisi neque pariatur a modi alias accusantium libero unde eligendi, voluptatum cum facere similique rerum ut et repellendus excepturi fugit sunt expedita eos optio. Optio temporibus deserunt, iure vero nostrum, nulla et quasi voluptas saepe quod quisquam, itaque exercitationem dolor sint eius voluptatem cum laborum ab ad rerum. Velit quod a, suscipit odit voluptatem expedita odio repellat, atque est fugit corrupti voluptatum facere amet et provident iusto aut? Harum error consequuntur quibusdam eum totam cum molestias, quis est aut vitae optio cupiditate sint rem ipsam exercitationem ad consequatur sunt facere? Fugiat molestias quos harum porro et cum ipsam repudiandae debitis. Sunt, nobis exercitationem aut accusantium voluptatibus soluta ipsum quia maiores optio esse atque debitis? Modi dignissimos consequuntur iure unde ipsum labore. Nesciunt perspiciatis facilis reiciendis voluptatibus, dicta neque obcaecati non iste asperiores quo odit, esse numquam. Est, sed vel quod laboriosam alias porro iste illum nisi, ducimus eius fugit voluptatum totam qui explicabo. Cupiditate voluptatibus adipisci aliquid et excepturi eligendi quia. Nihil labore commodi molestias, sapiente pariatur, expedita repellat fuga quidem, veritatis officia fugiat vitae accusamus nesciunt quaerat rerum. Dolor nesciunt officiis minima esse nulla obcaecati similique beatae, accusantium dolores rem? Perferendis, praesentium? Non repellat inventore fuga ea? Similique suscipit eaque hic commodi maiores omnis doloremque quo sit error. Expedita repudiandae sed porro incidunt veniam numquam fuga neque, quam, laboriosam adipisci voluptas magni ex excepturi delectus at odio! Doloribus corporis dolores impedit. Dignissimos expedita iste tempore, accusamus rem perspiciatis! Eligendi sed, quidem recusandae saepe quae autem labore repellat dolorum corrupti unde pariatur quasi nihil quod voluptatem, ex eos ratione. Tempore, ab. Dolores, perferendis. Inventore at impedit corrupti quibusdam eos? Doloremque doloribus repellat magni voluptates culpa? Quidem ut, illo amet voluptatum consequatur iure quasi, dolore, ea saepe doloremque molestiae magni. Debitis sed numquam reprehenderit obcaecati quam nisi, sint possimus eum incidunt iusto ab hic tenetur ex pariatur maiores, quo consectetur illum reiciendis eius accusantium dignissimos nesciunt sit. Recusandae aliquam aut, odio molestias neque ab magni nihil dolor maiores accusantium velit placeat pariatur obcaecati sit ex rerum. Maxime delectus nam est, vel a ducimus dolorum! Eveniet, sapiente explicabo corrupti soluta nobis fugiat perferendis laboriosam tenetur perspiciatis ex consequuntur blanditiis nam excepturi veniam repudiandae harum eius mollitia eaque delectus. In illo doloribus fugiat alias, sit tempore reiciendis placeat pariatur quis, libero, sapiente atque cumque delectus? Iusto ad veniam tempora unde consectetur quia amet facere provident voluptas porro sequi laborum delectus ducimus perspiciatis commodi maiores, totam ipsa nulla aut. Aperiam itaque delectus ab eaque illum maiores assumenda repellendus eum, enim odit excepturi mollitia beatae praesentium dolorem suscipit, dicta ipsum quos similique voluptates aut animi! Aut at fugit magnam, corporis quam nesciunt enim quidem omnis error laborum repudiandae dignissimos neque facere voluptates, optio ipsa eveniet illum modi et. Asperiores illum cumque quasi ad ducimus, harum distinctio, obcaecati iste dolore cum porro pariatur itaque saepe molestias nemo corporis optio eum! Deserunt quos quisquam excepturi, temporibus at dolorem tenetur molestias rem rerum quis id nam, ducimus vitae. Doloremque, perferendis eos a rerum consequatur ullam, fugiat placeat culpa commodi illum similique reiciendis laborum saepe! Autem, nostrum facere. Aperiam deserunt in totam sunt optio eligendi saepe eos laborum quaerat cumque quae quidem reprehenderit obcaecati debitis corrupti accusantium, at, dolore nihil aut sequi! Sint, porro vero aperiam magnam corporis blanditiis illo libero. Labore id vitae repellat fugiat nesciunt culpa suscipit similique, fugit doloremque, facere facilis beatae voluptatem quo ratione exercitationem aut voluptatum, eius sint cumque! Repellendus, magnam sequi eum ea fugit, reprehenderit obcaecati saepe impedit error ex dolores expedita aut aliquid hic repellat sed aliquam odio ad sint quod consequuntur nihil corporis delectus. Consequuntur veritatis, eveniet, cupiditate molestias iste eligendi nostrum aliquid beatae debitis autem assumenda quo cum illo aperiam? Eveniet, amet? Accusantium accusamus temporibus distinctio dolorum adipisci sint, iure cum tempore nulla delectus asperiores officiis nam maiores! Ratione ad voluptatibus, voluptatem quos perferendis expedita accusantium molestiae possimus sed dolore itaque modi reprehenderit quasi pariatur quod doloremque aperiam sequi illo non! Quos nam blanditiis, perspiciatis dolores officiis iure impedit vero, ratione quas laboriosam illo iste fugit quae est magni voluptate. Rem obcaecati consequatur cumque, cupiditate quidem tempore ex omnis pariatur ipsum labore, doloribus in nulla voluptatum iusto quam est animi cum vero similique delectus fuga? Veritatis fuga dolor nihil et sed qui est fugit quas esse explicabo, autem architecto maxime illum ea dicta possimus quibusdam quis natus laboriosam nesciunt voluptates fugiat culpa dolore temporibus. Tenetur atque tempora, sed voluptatum minima cupiditate quibusdam delectus, tempore dolorum doloribus incidunt, eligendi ducimus hic. Quis quo sint veritatis provident rerum alias rem aliquam? Vel, voluptas quae porro dolore ipsa incidunt cupiditate exercitationem voluptate repudiandae voluptatem eos maxime veritatis velit. Et, sint!
      </div>
    </section>
  )
};

export default Features;
