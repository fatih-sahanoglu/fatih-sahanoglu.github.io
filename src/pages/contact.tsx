import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import {Helmet} from "react-helmet";
import {injectIntl} from "gatsby-plugin-intl";
import Layout from "../components/layout";
import {Column, Row} from "../components/grid";
import {Contentful} from "../components/elements";
import ContactForm from "../components/contact-form";
import ReactMarkdown from "react-markdown";
import {toPhone} from "../utils/number";

const ContactPage = (props: any) => {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const slots = get(props, "data.contentfulPage.slots");
	const location = get(props, "data.contentfulLocation");
	return (
		<Layout>
			<Helmet title={`${props.intl.messages.contact} | ${siteTitle}`} />
			<Row>
				<Column raw>
					<h1>Contact</h1>
				</Column>
				<Column m={1} l={2} />
				<Column m={6} l={8}>
					<div>
						<a href={`tel:${toPhone(location.telephone)}`}>{location.telephone}</a>
					</div>
					<ReactMarkdown source={location.address.childMarkdownRemark.rawMarkdownBody} />
				</Column>
				<Column m={1} l={2} />
				{slots.map(({__typename, id, ...props}) => {
					return (
						<Column key={id}>
							<Contentful contentType={__typename} {...props} />
						</Column>
					);
				})}
				<ContactForm />
			</Row>
		</Layout>
	);
};

export default injectIntl(ContactPage);

export const pageQuery = graphql`
	query ContactQuery {
		site {
			siteMetadata {
				title
			}
		}
		contentfulLocation {
			telephone
			address {
				childMarkdownRemark {
					rawMarkdownBody
				}
			}
		}
		contentfulPage(slug: {eq: "contact"}) {
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
