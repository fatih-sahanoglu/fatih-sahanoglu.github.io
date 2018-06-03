import React from "react";
import Content from "../components/content";
import {Block, Fat, Huge, Bigger} from "../components/text";
import {Shade} from "../components/stage";
import {ScrollToTop} from "../components/scroll";
const About = () => {
	return (
		<Content>
			<Shade />
			<ScrollToTop />
			<Block>
				<Fat>
					Fatih was born on April 30th 1986 in{" "}
					<Huge>Munich, Germany</Huge>. Son of a family that has been
					living in Germany for 3 generations.{" "}
				</Fat>
				<Fat>
					In his two year career as an actor, one of the make-up
					artists noticed his <Huge>flair and sense for art</Huge>. It
					didn't take too long that he chose to try something new.
				</Fat>
				<Fat>
					<Bigger>
						In 2002 he finally started his apprenticeship as a
						hairdresser,{" "}
					</Bigger>
					which he finished in 2005.{" "}
				</Fat>
				<Fat>
					He always knew that this was <Huge>only the beginning</Huge>.
					He never wanted to accept the existence as a{" "}
					<Huge>hairdresser. </Huge>
				</Fat>
				<Fat>
					<Huge>
						Life has so much more to give than just the mainstream,
					</Huge>{" "}
					you can see on the streets today.{" "}
				</Fat>
				<Fat>
					After two years as a journeyman he finally made his{" "}
					<Bigger>master in 2007</Bigger> in the Oberpfalz in Bavaria.
					After one year of apprenticeship he started giving{" "}
					<Bigger>cutting seminars.</Bigger> In the same time he spent
					a lot of time with <Bigger>photography. </Bigger>
				</Fat>
				<Fat>
					In 2008 he met the <Huge>photographer, Bert</Huge>. Fatih
					and Bert are inflamed. With huge lust for photography,{" "}
				</Fat>
				<Fat>
					and retreated to absolute isolation.{" "}
					<Huge>Bert supplemented Fatih, as he did Bert. </Huge>
				</Fat>
				<Fat>
					In January 2010 the time had come. After two years of
					building time, <Bigger>his own inspiration</Bigger> and{" "}
					<Bigger>manual work,</Bigger> his artwork was
					<Bigger>
						finally opened to all his friends with a big welcome.
					</Bigger>
				</Fat>
			</Block>
		</Content>
	);
};

export default About;
