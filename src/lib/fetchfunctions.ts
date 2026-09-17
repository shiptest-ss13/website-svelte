import { faWikipediaW } from '@fortawesome/free-brands-svg-icons/faWikipediaW';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCodeMerge } from '@fortawesome/free-solid-svg-icons/faCodeMerge';
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons/faCodePullRequest';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons/faSquarePlus';

export async function githubPrs() {
	const response = await fetch(
		'https://api.github.com/repos/shiptest-ss13/shiptest/pulls?state=all&sort=updated&direction=desc&per_page=10',
		{
			headers: {
				Accept: 'application/vnd.github.text+json',
				'X-GitHub-Api-Version': '2026-03-10'
			}
		}
	);

	if (!response.ok) {
		throw Error('Unable to fetch latest github PRs');
	}

	const data: {
		[index: number]: {
			html_url: string;
			updated_at: string;
			created_at: string;
			number: number;
			state: 'open' | 'closed';
			merged_at: null | string;
			title: string;
			draft: boolean;
			user: {
				login: 'string';
			};
		};
	} = await response.json();

	if (!data) {
		throw Error('Unable to decode latest github PRs json');
	}

	return Object.values(data).map((pr) => {
		let icon = faCodePullRequest;
		let iconColor = '#5e5';

		if (pr.state == 'closed') {
			if (pr.merged_at !== null) {
				icon = faCodeMerge;
				iconColor = '#e5e';
			} else {
				iconColor = '#e55';
			}
		} else if (pr.draft) {
			iconColor = '#eees';
		}

		return {
			...pr,
			icon,
			iconColor
		};
	});
}

export async function forumPosts() {
	const response = await fetch(
		'https://forums.shiptest.net/api/posts?sort=-createdAt&page[size]=10'
	);

	if (!response.ok) {
		throw Error('Unable to fetch latest forum posts');
	}

	const data = await response.json();

	if (!data || !data['data'] || !data['included']) {
		throw Error('Unable to decode latest forum posts json');
	}

	interface User {
		id: `${number}`;
		type: 'users';

		attributes: { username: string; displayName: string };
	}

	interface Discussion {
		id: `${number}`;
		type: 'discussions';

		attributes: { title: string; slug: string };
	}

	interface Post {
		id: `${number}`;
		type: 'posts';
		attributes: { number: number; createdAt: string; contentHtml: string };
		relationships: {
			user: { data: { id: `${number}` } };
			discussion: { data: { id: `${number}` } };
		};
	}

	const postData: {
		[index: `${number}`]: Post;
	} = data['data'];

	const includedData: {
		[index: `${number}`]: User | Discussion;
	} = data['included'];

	const users = Object.fromEntries(
		Object.values(includedData)
			.filter((obj) => obj.type == 'users')
			.map((user) => [user.id, user.attributes])
	);
	const discs = Object.fromEntries(
		Object.values(includedData)
			.filter((obj) => obj.type == 'discussions')
			.map((disc) => [disc.id, disc.attributes])
	);

	const final = Object.values(postData).map((post) => ({
		id: post.id,
		number: post.attributes.number,
		content: post.attributes.contentHtml,
		createdAt: post.attributes.createdAt,
		discussion: discs[`${post.relationships.discussion.data.id}`] || { slug: 'Error' },
		user: users[`${post.relationships.user.data.id}`] || { displayName: 'Error' }
	}));

	return final;
}

export function faWikiIcon(wikiType: string): IconDefinition {
	switch (wikiType) {
		case 'edit':
			return faEdit;
		case 'log':
			return faList;
		case 'new':
			return faSquarePlus;
		default:
			return faWikipediaW;
	}
}

export async function wikiChanges() {
	const resp = await fetch(
		'https://shiptest.net/w/api.php?format=json&list=recentchanges&action=query&rcprop=title|user|comment|timestamp&rcexcludeuser=Shiptest-bot&rcnamespace=10&rcshow=!bot|!redirect'
	);

	if (!resp.ok) {
		throw Error('Unable to fetch latest wiki changes');
	}

	const data = await resp.json();

	if (!data || !data['query'] || !data['query']['recentchanges']) {
		throw Error('Unable to decode latest wiki changes json');
	}

	const changes: {
		type: string;
		title: string;
		timestamp: string;
		user: string;
		comment: string;
	}[] = data['query']['recentchanges'];

	return changes;
}
