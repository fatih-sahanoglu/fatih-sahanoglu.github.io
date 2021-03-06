import React from "react";
import {graphql} from "gatsby";
import get from "lodash/get";
import {Helmet} from "react-helmet";
import {injectIntl} from "gatsby-plugin-intl";
import Layout from "../components/layout";
import ArticlePreview from "../components/article-preview";
import {Column, Row} from "../components/grid";
import GatsbyImage from "gatsby-image";
import {Person} from "../components/person";
import {Avatar, ImgWrapper} from "../components/avatar";

function BlogIndex(props: any) {
	const siteTitle = get(props, "data.site.siteMetadata.title");
	const posts = get(props, "data.allContentfulBlogPost.edges");
	const person = get(props, "data.contentfulPerson");

	return (
		<Layout>
			<Helmet title={`${props.intl.messages.blog} | ${siteTitle}`} />
			<Row>
				<Column s={1} m={2}>
					<Person>
						<Avatar>
							<ImgWrapper>
								<GatsbyImage fluid={person.image.fluid} />
							</ImgWrapper>
						</Avatar>
					</Person>
				</Column>
				<Column s={3} m={4} l={8}>
					<Row>
						{posts.map(({node}) => {
							return (
								<Column key={node.slug} raw>
									<ArticlePreview article={node} />
								</Column>
							);
						})}
					</Row>
				</Column>
			</Row>
		</Layout>
	);
}

export default injectIntl(BlogIndex);

export const pageQuery = graphql`
	query BlogIndexQuery($locale: String) {
		site {
			siteMetadata {
				title
			}
		}
		allContentfulBlogPost(
			filter: {node_locale: {eq: $locale}}
			sort: {fields: [publishDate], order: DESC}
		) {
			edges {
				node {
					title
					slug
					publishDate(formatString: "MMMM Do, YYYY")
					heroImage {
						title
						description
						fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: THUMB) {
							...GatsbyContentfulFluid_withWebp
						}
					}
					body {
						childMarkdownRemark {
							excerpt
							timeToRead
						}
					}
				}
			}
		}
		contentfulPerson(id: {eq: "e03ecdfb-d1ce-57a0-9c83-c012a764e7dc"}) {
			id
			name
			image {
				id
				fluid {
					...GatsbyContentfulFluid_withWebp
				}
			}
		}
	}
`;
