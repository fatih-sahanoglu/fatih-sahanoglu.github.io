import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import {injectIntl} from "gatsby-plugin-intl";
import Layout from "../components/layout";
import {Helmet} from "react-helmet";
import {Box, Column, Row} from "../components/grid";
import {Spacing} from "../components/spacing";
import {ParallaxBox} from "../components/parallax";
import {Cover, GalleryImage} from "../components/cover";
import FluidType from "../components/fluid-type";

function GalleryTemplate(props: any) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const post = get(props, "data.contentfulGallery");
	return (
		<Layout>
			<Helmet title={`${post.name} | ${props.intl.messages.gallery} | ${siteTitle}`} />
			<Row>
				<Column raw>
					<Spacing size="l" />
					<FluidType as="h1" minFontSize={40} maxFontSize={100} center>
						{post.name}
					</FluidType>
					<Spacing size="m" />
				</Column>
				{post.images.map((image, i) => {
					return (
						<React.Fragment key={`${image.id}:${i}`}>
							<Column m={i % 2} l={i % 2} />
							<Column
								m={(i % 3) + (i % 3 === 0 ? 3 : 2)}
								l={(i % 3) + (i % 3 === 2 ? 5 : 4)}
								flex>
								<Box alignSelf="center" removePadding>
									<Spacing size="m" />
									<ParallaxBox index={i}>
										<Cover>
											<GalleryImage alt={image.title} fluid={image.fluid} />
										</Cover>
									</ParallaxBox>
									<Spacing size="m" />
								</Box>
							</Column>
							<Column m={i % 2} l={1} />
							<Column m={(i + 1) % 3} l={(i + 1) % 3} />
						</React.Fragment>
					);
				})}
			</Row>
		</Layout>
	);
}

export default injectIntl(GalleryTemplate);

export const pageQuery = graphql`
	query GalleryBySlug($slug: String!, $locale: String) {
		site {
			siteMetadata {
				title
			}
		}
		contentfulGallery(slug: {eq: $slug}, node_locale: {eq: $locale}) {
			id
			title
			name
			images {
				id
				title
				description
				fluid(maxWidth: 800) {
					...GatsbyContentfulFluid_withWebp
				}
			}
		}
	}
`;
