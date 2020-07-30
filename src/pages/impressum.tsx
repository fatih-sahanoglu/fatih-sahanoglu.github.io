import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import Helmet from "react-helmet";
import {injectIntl} from "gatsby-plugin-intl";
import Layout from "../components/layout";
import {Column, Row} from "../components/grid";
import {Contentful} from "../components/elements";

const Impressum = props => {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const slots = get(props, "data.contentfulPage.slots");
	return (
		<Layout>
			<Helmet title={`${props.intl.messages.imprint} | ${siteTitle}`} />
			<Row>
				<Column raw>
					<h1>Impressum</h1>
				</Column>
				{slots.map(({__typename, id, ...props}) => {
					return (
						<Column key={id}>
							<Contentful contentType={__typename} {...props} />
						</Column>
					);
				})}
			</Row>
		</Layout>
	);
};

export default injectIntl(Impressum);

export const pageQuery = graphql`
	query ImprintQuery {
		site {
			siteMetadata {
				title
			}
		}
		contentfulPage(slug: {eq: "impressum"}) {
			id
			title
			slots {
				... on ContentfulMarkdown {
					id
					text {
						childMarkdownRemark {
							rawMarkdownBody
						}
					}
				}
				... on ContentfulGallery {
					id
					images {
						id
						title
						description
						fluid(maxWidth: 1600) {
							...GatsbyContentfulFluid_withWebp
						}
					}
				}
				... on ContentfulHero {
					id
					autoplay
					cards {
						id
						backgroundColor
						backgroundImage {
							title
							description
							fluid(maxWidth: 1600, maxHeight: 600) {
								...GatsbyContentfulFluid_withWebp
							}
						}
						body {
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
						headline {
							childMarkdownRemark {
								rawMarkdownBody
							}
						}
					}
				}
				... on ContentfulLocation {
					id
					location {
						lat
						lon
					}
				}
				... on ContentfulVideo {
					id
					vimeo
				}
			}
		}
	}
`;
