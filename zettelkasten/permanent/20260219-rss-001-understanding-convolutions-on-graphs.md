---
---
id: 20260219-rss-001-understanding-convolutions-on-graphs
title: Understanding Convolutions on Graphs
created: 2026-02-19
tags: ["rss", "auto-import", "neural network", "gnn", "graph neural", "rl", "understanding convolutions"]
source: "Distill: Machine Learning Research"
source_url: "https://distill.pub/2021/understanding-gnns"
---
---

# Understanding Convolutions on Graphs

Title: Understanding Convolutions on Graphs

URL Source: https://distill.pub/2021/understanding-gnns

Markdown Content:
 Distill
ABOUT PRIZE SUBMIT
Understanding Convolutions on Graphs

Understanding the building blocks and design choices of graph neural networks.

AUTHORS
AFFILIATIONS

Ameya Daigavane

Google Research

Balaraman Ravindran

Google Research

Gaurav Aggarwal

Google Research

PUBLISHED

Sept. 2, 2021

DOI

10.23915/distill.00032

Contents
Introduction
The Challenges of Computation on Graphs
Lack of Consistent Structure
Node-Order Equivariance
Scalability
Problem Setting and Notation
Extending Convolutions to Graphs
Polynomial Filters on Graphs
Modern Graph Neural Networks
Interactive Graph Neural Networks
From Local to Global Convolutions
Spectral Convolutions
Global Propagation via Graph Embeddings
Learning GNN Parameters
Conclusions and Further Reading
GNNs in Practice
Different Kinds of Graphs
Pooling
Supplementary Material
Reproducing Experiments
Recreating Visualizations

This article is one of two Distill publications about graph neural networks. Take a look at A Gentle Introduction to Graph Neural Networks  for a companion view on many things graph and neural network related.

Many systems and interactions - social networks, molecules, organizations, citations, physical models, transactions - can be represented quite naturally as graphs. How can we reason about and make predictions within these systems?

One idea is to look at tools that have worked well in other domains: neural networks have shown immense predictive power in a variety of learning tasks. However, neural networks have been traditionally used to operate on fixed-size and/or regular-structured inputs (such as sentences, images and video). This makes them unable to elegantly process graph-structured data.

Graph neural networks (GNNs) are a family of neural networks that can operate naturally on graph-structured data. By extracting and utilizing features from the underlying graph, GNNs can make more informed predictions about entities in these interactions, as compared to models that consider individual entities in isolation.

GNNs are not the only tools available to model graph-structured data: graph kernels  and random-walk methods  were some of the most popular ones. Today, however, GNNs have largely replaced these techniques because of their inherent flexibility to model the underlying systems better.

In this article, we will illustrate the challenges of computing over graphs, describe the origin and design of graph neural networks, and explore the most popular GNN variants in recent times. Particularly, we will see that many of these variants are composed of similar building blocks.

First, let’s discuss some of the complications that graphs come with.

The Challenges of Computation on Graphs
Lack of Consistent Structure

Graphs are extremely flexible mathematical models; but this means they lack consistent structure across instances. Consider the task of predicting whether a given chemical molecule is toxic  :

Left: A non-toxic 1,2,6-trigalloyl-glucose molecule.
Right: A toxic caramboxin molecule.

Looking at a few examples, the following issues quickly become apparent:

Molecules may have different numbers of atoms.
The atoms in a molecule may be of different types.
Each of these atoms may have different number of connections.
These connections can have different strengths.

Representing graphs in a format that can be computed over is non-trivial, and the final representation chosen often depends significantly on the actual problem.

Node-Order Equivariance

Extending the point above: graphs often have no inherent ordering present amongst the nodes. Compare this to images, where every pixel is uniquely determined by its absolute position within the image!

Representing the graph as one vector requires us to fix an order on the nodes. But what do we do when the nodes have no inherent order? Above: The same graph labelled in two different ways. The alphabets indicate the ordering of the nodes.

As a result, we would like our algorithms to be node-order equivariant: they should not depend on the ordering of the nodes of the graph. If we permute the nodes in some way, the resulting representations of the nodes as computed by our algorithms should also be permuted in the same way.

Scalability

Graphs can be really large! Think about social networks like Facebook and Twitter, which have over a billion users. Operating on data this large is not easy.

Luckily, most naturally occuring graphs are ‘sparse’: they tend to have their number of edges linear in their number of vertices. We will see that this allows the use of clever methods to efficiently compute representations of nodes within the graph. Further, the methods that we look at here will have significantly fewer parameters in comparison to the size of the graphs they operate on.

Problem Setting and Notation

There are many useful problems that can be formulated over graphs:

Node Classification: Classifying individual nodes.
Graph Classification: Classifying entire graphs.
Node Clustering: Grouping together similar nodes based on connectivity.
Link Prediction: Predicting missing links.
Influence Maximization: Identifying influential nodes.
Examples of problems that can be defined over graphs. This list is not exhaustive!

A common precursor in solving many of these problems is node representation learning: learning to map individual nodes to fixed-size real-valued vectors (called ‘representations’ or ‘embeddings’).

In Learning GNN Parameters, we will see how the learnt embeddings can be used for these tasks.

Different GNN variants are distinguished by the way these representations are computed. Generally, however, GNNs compute node representations in an iterative process. We will use the notation 
ℎ
𝑣
(
𝑘
)
h
v
(k)
	​
 to indicate the representation of node 
𝑣
v after the 
𝑘
th
k
th
 iteration. Each iteration can be thought of as the equivalent of a ‘layer’ in standard neural networks.

We will define a graph 
𝐺
G as a set of nodes, 
𝑉
V, with a set of edges 
𝐸
E connecting them. Nodes can have individual features as part of the input: we will denote by 
𝑥
𝑣
x
v
	​
 the individual feature for node 
𝑣
∈
𝑉
v∈V. For example, the ‘node features’ for a pixel in a color image would be the red, green and blue channel (RGB) values at that pixel.

For ease of exposition, we will assume 
𝐺
G is undirected, and all nodes are of the same type. Many of the same ideas we will see here apply to other kinds of graphs: we will discuss this later in Different Kinds of Graphs.

Sometimes we will need to denote a graph property by a matrix 
𝑀
M, where each row 
𝑀
𝑣
M
v
	​
 represents a property corresponding to a particular vertex 
𝑣
v.

Extending Convolutions to Graphs

Convolutional Neural Networks have been seen to be quite powerful in extracting features from images. However, images themselves can be seen as graphs with a very regular grid-like structure, where the individual pixels are nodes, and the RGB channel values at each pixel as the node features.

A natural idea, then, is to consider generalizing convolutions to arbitrary graphs. Recall, however, the challenges listed out in the previous section: in particular, ordinary convolutions are not node-order invariant, because they depend on the absolute positions of pixels. It is initially unclear as how to generalize convolutions over grids to convolutions over general graphs, where the neighbourhood structure differs from node to node. 

Convolution in CNNs
1
7
6
7
1
6
4
5
6
3
Convolutions in CNNs are inherently localized. Neighbours participating in the convolution at the center pixel are highlighted in gray.
4
6
1
2
5
4
1
7
3
6
1
7
6
Localized Convolution in GNNs
2
GNNs can perform localized convolutions mimicking CNNs. Hover over a node to see its immediate neighbourhood highlighted on the left. The structure of this neighbourhood changes from node to node.

We begin by introducing the idea of constructing polynomial filters over node neighbourhoods, much like how CNNs compute localized filters over neighbouring pixels. Then, we will see how more recent approaches extend on this idea with more powerful mechanisms. Finally, we will discuss alternative methods that can use ‘global’ graph-level information for computing node representations.

Polynomial Filters on Graphs
The Graph Laplacian

Given a graph 
𝐺
G, let us fix an arbitrary ordering of the 
𝑛
n nodes of 
𝐺
G. We denote the 
0
−
1
0−1 adjacency matrix of 
𝐺
G by 
𝐴
A, we can construct the diagonal degree matrix 
𝐷
D of 
𝐺
G as:

𝐷
𝑣
=
∑
𝑢
𝐴
𝑣
𝑢
.
D
v
	​
=
u
∑
	​
A
vu
	​
.
The degree of node 
𝑣
v is the number of edges incident at 
𝑣
v.

where 
𝐴
𝑣
𝑢
A
vu
	​
 denotes the entry in the row corresponding to 
𝑣
v and the column corresponding to 
𝑢
u in the matrix 
𝐴
A. We will use this notation throughout this section.

Then, the graph Laplacian 
𝐿
L is the square 
𝑛
×
𝑛
n×n matrix defined as: 
𝐿
=
𝐷
−
𝐴
.
L=D−A.

The Laplacian 
𝐿
L for an undirected graph 
𝐺
G, with the row corresponding to node 
C
C highlighted. Zeros in 
𝐿
L are not displayed above. The Laplacian 
𝐿
L depends only on the structure of the graph 
𝐺
G, not on any node features.

The graph Laplacian gets its name from being the discrete analog of the Laplacian operator from calculus.

Although it encodes precisely the same information as the adjacency matrix 
𝐴
A , the graph Laplacian has many interesting properties of its own. We will see some of these properties in a later section, but will instead point readers to this tutorial for greater insight into the graph Laplacian.

Polynomials of the Laplacian

Now that we have understood what the graph Laplacian is, we can build polynomials  of the form:
𝑝
𝑤
(
𝐿
)
=
𝑤
0
𝐼
𝑛
+
𝑤
1
𝐿
+
𝑤
2
𝐿
2
+
…
+
𝑤
𝑑
𝐿
𝑑
=
∑
𝑖
=
0
𝑑
𝑤
𝑖
𝐿
𝑖
.
p
w
	​
(L)=w
0
	​
I
n
	​
+w
1
	​
L+w
2
	​
L
2
+…+w
d
	​
L
d
=
i=0
∑
d
	​
w
i
	​
L
i
.
Each polynomial of this form can alternately be represented by its vector of coefficients 
𝑤
=
[
𝑤
0
,
…
,
𝑤
𝑑
]
w=[w
0
	​
,…,w
d
	​
]. Note that for every 
𝑤
w, 
𝑝
𝑤
(
𝐿
)
p
w
	​
(L) is an 
𝑛
×
𝑛
n×n matrix, just like 
𝐿
L.

These polynomials can be thought of as the equivalent of ‘filters’ in CNNs, and the coefficients 
𝑤
w as the weights of the ‘filters’.

For ease of exposition, we will focus on the case where nodes have one-dimensional features: each of the 
𝑥
𝑣
x
v
	​
 for 
𝑣
∈
𝑉
v∈V is just a real number. The same ideas hold when each of the 
𝑥
𝑣
x
v
	​
 are higher-dimensional vectors, as well.

Using the previously chosen ordering of the nodes, we can stack all of the node features 
𝑥
𝑣
x
v
	​
 to get a vector 
𝑥
∈
𝑅
𝑛
x∈R
n
.

Fixing a node order (indicated by the alphabets) and collecting all node features into a single vector 
𝑥
x.

Once we have constructed the feature vector 
𝑥
x, we can define its convolution with a polynomial filter 
𝑝
𝑤
p
w
	​
 as:
𝑥
′
=
𝑝
𝑤
(
𝐿
)
 
𝑥
x
′
=p
w
	​
(L) x
To understand how the coefficients 
𝑤
w affect the convolution, let us begin by considering the ‘simplest’ polynomial: when 
𝑤
0
=
1
w
0
	​
=1 and all of the other coefficients are 
0
0. In this case, 
𝑥
′
x
′
 is just 
𝑥
x:
𝑥
′
=
𝑝
𝑤
(
𝐿
)
 
𝑥
=
∑
𝑖
=
0
𝑑
𝑤
𝑖
𝐿
𝑖
𝑥
=
𝑤
0
𝐼
𝑛
𝑥
=
𝑥
.
x
′
=p
w
	​
(L) x=
i=0
∑
d
	​
w
i
	​
L
i
x=w
0
	​
I
n
	​
x=x.
Now, if we increase the degree, and consider the case where instead 
𝑤
1
=
1
w
1
	​
=1 and and all of the other coefficients are 
0
0. Then, 
𝑥
′
x
′
 is just 
𝐿
𝑥
Lx, and so:
𝑥
𝑣
′
=
(
𝐿
𝑥
)
𝑣
	
=
𝐿
𝑣
𝑥


	
=
∑
𝑢
∈
𝐺
𝐿
𝑣
𝑢
𝑥
𝑢


	
=
∑
𝑢
∈
𝐺
(
𝐷
𝑣
𝑢
−
𝐴
𝑣
𝑢
)
𝑥
𝑢


	
=
𝐷
𝑣
 
𝑥
𝑣
−
∑
𝑢
∈
𝑁
(
𝑣
)
𝑥
𝑢
x
v
′
	​
=(Lx)
v
	​

	​

=L
v
	​
x
=
u∈G
∑
	​
L
vu
	​
x
u
	​

=
u∈G
∑
	​
(D
vu
	​
−A
vu
	​
)x
u
	​

=D
v
	​
 x
v
	​
−
u∈N(v)
∑
	​
x
u
	​

	​

We see that the features at each node 
𝑣
v are combined with the features of its immediate neighbours 
𝑢
∈
𝑁
(
𝑣
)
u∈N(v). 

At this point, a natural question to ask is: How does the degree 
𝑑
d of the polynomial influence the behaviour of the convolution? Indeed, it is not too hard to show that: 
dist
𝐺
(
𝑣
,
𝑢
)
>
𝑖
⟹
𝐿
𝑣
𝑢
𝑖
=
0
.
dist
G
	​
(v,u)>i⟹L
vu
i
	​
=0.
This implies, when we convolve 
𝑥
x with 
𝑝
𝑤
(
𝐿
)
p
w
	​
(L) of degree 
𝑑
d to get 
𝑥
′
x
′
:
𝑥
𝑣
′
=
(
𝑝
𝑤
(
𝐿
)
𝑥
)
𝑣
	
=
(
𝑝
𝑤
(
𝐿
)
)
𝑣
𝑥


	
=
∑
𝑖
=
0
𝑑
𝑤
𝑖
𝐿
𝑣
𝑖
𝑥


	
=
∑
𝑖
=
0
𝑑
𝑤
𝑖
∑
𝑢
∈
𝐺
𝐿
𝑣
𝑢
𝑖
𝑥
𝑢


	
=
∑
𝑖
=
0
𝑑
𝑤
𝑖
∑
𝑢
∈
𝐺
dist
𝐺
(
𝑣
,
𝑢
)
≤
𝑖
𝐿
𝑣
𝑢
𝑖
𝑥
𝑢
.
x
v
′
	​
=(p
w
	​
(L)x)
v
	​

	​

=(p
w
	​
(L))
v
	​
x
=
i=0
∑
d
	​
w
i
	​
L
v
i
	​
x
=
i=0
∑
d
	​
w
i
	​

u∈G
∑
	​
L
vu
i
	​
x
u
	​

=
i=0
∑
d
	​
w
i
	​

dist
G
	​
(v,u)≤i
u∈G
	​

∑
	​
L
vu
i
	​
x
u
	​
.
	​


Effectively, the convolution at node 
𝑣
v occurs only with nodes 
𝑢
u which are not more than 
𝑑
d hops away. Thus, these polynomial filters are localized. The degree of the localization is governed completely by 
𝑑
d.

To help you understand these ‘polynomial-based’ convolutions better, we have created the visualization below. Vary the polynomial coefficients and the input grid 
𝑥
x to see how the result 
𝑥
′
x
′
 of the convolution changes. The grid under the arrow shows the equivalent convolutional kernel applied at the highlighted pixel in 
𝑥
x to get the resulting pixel in 
𝑥
′
x
′
. The kernel corresponds to the row of 
𝑝
𝑤
(
𝐿
)
p
w
	​
(L) for the highlighted pixel. Note that even after adjusting for position, this kernel is different for different pixels, depending on their position within the grid.

Reset Grid Randomize Grid
−2
−1
0
1
2
Color Scale
Input Grid
𝑥
∈
{
0
,
1
}
25
x∈{0,1}
25
𝑝
𝑤
(
𝐿
)
p
w
	​

(L)
Convolutional Kernel at Highlighted Pixel
Output Grid
𝑥
′
∈
𝑅
25
x
′
∈R
25
Convolve
𝑝
𝑤
(
𝐿
)
=
∑
𝑖
=
0
2
𝑤
𝑖
𝐿
𝑖
=
1
𝐼
 
+
 
0.1
𝐿
 
+
 
0
𝐿
2
.
p
w
	​

(L)=
i=0
∑
2
	​

w
i
	​

L
i
=1I + 0.1L + 0L
2
.
𝑤
0
w
0
	​

 1
𝑤
1
w
1
	​

 0.1
𝑤
2
w
2
	​

 0
Choice of Laplacian
 
Unnormalized 
𝐿
Unnormalized L 
Normalized 
𝐿
~
Normalized 
L
~
Reset Coefficients

Hover over a pixel in the input grid (left, representing 
𝑥
x) to highlight it and see the equivalent convolutional kernel for that pixel under the arrow. The result 
𝑥
′
x
′
 of the convolution is shown on the right: note that different convolutional kernels are applied at different pixels, depending on their location.

Click on the input grid to toggle pixel values between 
0
0 (white) and 
1
1 (blue). To randomize the input grid, press ‘Randomize Grid’. To reset all pixels to 
0
0, press ‘Reset Grid’. Use the sliders at the bottom to change the coefficients 
𝑤
w. To reset all coefficients 
𝑤
w to 
0
0, press ‘Reset Coefficients.’

ChebNet
ChebNet  refines this idea of polynomial filters by looking at polynomial filters of the form:
𝑝
𝑤
(
𝐿
)
=
∑
𝑖
=
1
𝑑
𝑤
𝑖
𝑇
𝑖
(
𝐿
~
)
p
w
	​
(L)=
i=1
∑
d
	​
w
i
	​
T
i
	​
(
L
~
)
where 
𝑇
𝑖
T
i
	​
 is the degree-
𝑖
i Chebyshev polynomial of the first kind and 
𝐿
~
L
~
 is the normalized Laplacian defined using the largest eigenvalue of 
𝐿
L: 
𝐿
~
=
2
𝐿
𝜆
max
(
𝐿
)
−
𝐼
𝑛
.
L
~
=
λ
max
	​
(L)
2L
	​
−I
n
	​
.

What is the motivation behind these choices?

𝐿
L is actually positive semi-definite: all of the eigenvalues of 
𝐿
L are not lesser than 
0
0. If 
𝜆
max
(
𝐿
)
>
1
λ
max
	​
(L)>1, the entries in the powers of 
𝐿
L rapidly increase in size. 
𝐿
~
L
~
 is effectively a scaled-down version of 
𝐿
L, with eigenvalues guaranteed to be in the range 
[
−
1
,
1
]
[−1,1]. This prevents the entries of powers of 
𝐿
~
L
~
 from blowing up. Indeed, in the visualization above: we restrict the higher-order coefficients when the unnormalized Laplacian 
𝐿
L is selected, but allow larger values when the normalized Laplacian 
𝐿
~
L
~
 is selected, in order to show the result 
𝑥
′
x
′
 on the same color scale.
The Chebyshev polynomials have certain interesting properties that make interpolation more numerically stable. We won’t talk about this in more depth here, but will advise interested readers to take a look at  as a definitive resource.
Polynomial Filters are Node-Order Equivariant

The polynomial filters we considered here are actually independent of the ordering of the nodes. This is particularly easy to see when the degree of the polynomial 
𝑝
𝑤
p
w
	​
 is 
1
1: where each node’s feature is aggregated with the sum of its neighbour’s features. Clearly, this sum does not depend on the order of the neighbours. A similar proof follows for higher degree polynomials: the entries in the powers of 
𝐿
L are equivariant to the ordering of the nodes.

Details for the Interested Reader

As above, let’s assume an arbitrary node-order over the 
𝑛
n nodes of our graph. Any other node-order can be thought of as a permutation of this original node-order. We can represent any permutation by a permutation matrix 
𝑃
P. 
𝑃
P will always be an orthogonal 
0
−
1
0−1 matrix:
𝑃
𝑃
𝑇
=
𝑃
𝑇
𝑃
=
𝐼
𝑛
.
PP
T
=P
T
P=I
n
	​
.
Then, we call a function 
𝑓
f node-order equivariant iff for all permutations 
𝑃
P:
𝑓
(
𝑃
𝑥
)
=
𝑃
𝑓
(
𝑥
)
.
f(Px)=Pf(x).
When switching to the new node-order using the permutation 
𝑃
P, the quantities below transform in the following way:
𝑥
	
→
𝑃
𝑥


𝐿
	
→
𝑃
𝐿
𝑃
𝑇


𝐿
𝑖
	
→
𝑃
𝐿
𝑖
𝑃
𝑇
x
L
L
i
	​

→Px
→PLP
T
→PL
i
P
T
	​

and so, for the case of polynomial filters where 
𝑓
(
𝑥
)
=
𝑝
𝑤
(
𝐿
)
 
𝑥
f(x)=p
w
	​
(L) x, we can see that:
𝑓
(
𝑃
𝑥
)
	
=
∑
𝑖
=
0
𝑑
𝑤
𝑖
(
𝑃
𝐿
𝑖
𝑃
𝑇
)
(
𝑃
𝑥
)


	
=
𝑃
∑
𝑖
=
0
𝑑
𝑤
𝑖
𝐿
𝑖
𝑥


	
=
𝑃
𝑓
(
𝑥
)
.
f(Px)
	​

=
i=0
∑
d
	​
w
i
	​
(PL
i
P
T
)(Px)
=P
i=0
∑
d
	​
w
i
	​
L
i
x
=Pf(x).
	​

as claimed.

Embedding Computation

We now describe how we can build a graph neural network by stacking ChebNet (or any polynomial filter) layers one after the other with non-linearities, much like a standard CNN. In particular, if we have 
𝐾
K different polynomial filter layers, the 
𝑘
th
k
th
 of which has its own learnable weights 
𝑤
(
𝑘
)
w
(k)
, we would perform the following computation:

Start with the original features.
ℎ
(
0
)
=
𝑥
h
(0)
=x
Then iterate, for 
𝑘
=
1
,
2
,
…
k=1,2,… upto 
𝐾
K:
𝑝
(
𝑘
)
	
=
𝑝
𝑤
(
𝑘
)
(
𝐿
)




𝑔
(
𝑘
)
	
=
𝑝
(
𝑘
)
×
ℎ
(
𝑘
−
1
)




ℎ
(
𝑘
)
	
=
𝜎
(
𝑔
(
𝑘
)
)
p
(k)
g
(k)
h
(k)
	​

=p
w
(k)
	​

(L)
=p
(k)
×h
(k−1)
=σ(g
(k)
)
	​

Compute the matrix 
𝑝
(
𝑘
)
p
(k)
 as the polynomial defined by the filter weights 
𝑤
(
𝑘
)
w
(k)
 evaluated at 
𝐿
L.
Multiply 
𝑝
(
𝑘
)
p
(k)
 with 
ℎ
(
𝑘
−
1
)
h
(k−1)
: a standard matrix-vector multiply operation.
Apply a non-linearity 
𝜎
σ to 
𝑔
(
𝑘
)
g
(k)
 to get 
ℎ
(
𝑘
)
h
(k)
.
Color Codes:
Computed node embeddings.
Learnable parameters.

Note that these networks reuse the same filter weights across different nodes, exactly mimicking weight-sharing in Convolutional Neural Networks (CNNs) which reuse weights for convolutional filters across a grid.

Modern Graph Neural Networks

ChebNet was a breakthrough in learning localized filters over graphs, and it motivated many to think of graph convolutions from a different perspective.

We return back to the result of convolving 
𝑥
x by the polynomial kernel 
𝑝
𝑤
(
𝐿
)
=
𝐿
p
w
	​
(L)=L, focussing on a particular vertex 
𝑣
v:
(
𝐿
𝑥
)
𝑣
	
=
𝐿
𝑣
𝑥


	
=
∑
𝑢
∈
𝐺
𝐿
𝑣
𝑢
𝑥
𝑢


	
=
∑
𝑢
∈
𝐺
(
𝐷
𝑣
𝑢
−
𝐴
𝑣
𝑢
)
𝑥
𝑢


	
=
𝐷
𝑣
 
𝑥
𝑣
−
∑
𝑢
∈
𝑁
(
𝑣
)
𝑥
𝑢
(Lx)
v
	​

	​

=L
v
	​
x
=
u∈G
∑
	​
L
vu
	​
x
u
	​

=
u∈G
∑
	​
(D
vu
	​
−A
vu
	​
)x
u
	​

=D
v
	​
 x
v
	​
−
u∈N(v)
∑
	​
x
u
	​

	​


As we noted before, this is a 
1
1-hop localized convolution. But more importantly, we can think of this convolution as arising of two steps:

Aggregating over immediate neighbour features 
𝑥
𝑢
x
u
	​
.
Combining with the node’s own feature 
𝑥
𝑣
x
v
	​
.

Key Idea: What if we consider different kinds of ‘aggregation’ and ‘combination’ steps, beyond what are possible using polynomial filters?

By ensuring that the aggregation is node-order equivariant, the overall convolution becomes node-order equivariant.

These convolutions can be thought of as ‘message-passing’ between adjacent nodes: after each step, every node receives some ‘information’ from its neighbours.

By iteratively repeating the 
1
1-hop localized convolutions 
𝐾
K times (i.e., repeatedly ‘passing messages’), the receptive field of the convolution effectively includes all nodes upto 
𝐾
K hops away.

Embedding Computation

Message-passing forms the backbone of many GNN architectures today. We describe the most popular ones in depth below:

Graph Convolutional Networks (GCN)
Graph Attention Networks (GAT)
Graph Sample and Aggregate (GraphSAGE)
Graph Isomorphism Network (GIN)
GCN
GAT
GraphSAGE
GIN
ℎ
𝑣
(
0
)
h
v
(0)
	​

=
=
𝑥
𝑣
x
v
	​

Node 
𝑣
v's initial embedding.
... is just node 
𝑣
v's original features.
for all 
𝑣
∈
𝑉
.
v∈V.
and for 
𝑘
=
1
,
2
,
…
k=1,2,… upto 
𝐾
K:
ℎ
𝑣
(
𝑘
)
h
v
(k)
	​

=
=
𝑓
(
𝑘
)
(
𝑊
(
𝑘
)
⋅
∑
𝑢
∈
𝑁
(
𝑣
)
ℎ
𝑢
(
𝑘
−
1
)
∣
𝑁
(
𝑣
)
∣
+
𝐵
(
𝑘
)
⋅
ℎ
𝑣
(
𝑘
−
1
)
)
f
(k)
⎝
⎜
⎜
⎜
⎛
	​

W
(k)
⋅
∣N(v)∣
u∈N(v)
∑
	​

h
u
(k−1)
	​

	​

+B
(k)
⋅h
v
(k−1)
	​

⎠
⎟
⎟
⎟
⎞
	​

Node 
𝑣
v's embedding at step 
𝑘
k.
Mean of 
𝑣
v's neighbour's embeddings at step 
𝑘
−
1
k−1.
Node 
𝑣
v's embedding at step 
𝑘
−
1
k−1.
for all 
𝑣
∈
𝑉
.
v∈V.
Color Codes:
Embedding of node 
𝑣
v.
Embedding of a neighbour of node 
𝑣
v.
(Potentially) Learnable parameters.

Predictions can be made at each node by using the final computed embedding:
𝑦
𝑣
^
=
PREDICT
(
ℎ
𝑣
(
𝐾
)
)
y
v
	​

^
	​

=PREDICT(h
v
(K)
	​

)
where 
PREDICT
PREDICT is generally another neural network, learnt together with the GCN model.

For each step 
𝑘
k, the function 
𝑓
(
𝑘
)
f
(k)
, matrices 
𝑊
(
𝑘
)
W
(k)
 and 
𝐵
(
𝑘
)
B
(k)
 are shared across all nodes.

This allows the GCN model to scale well, because the number of parameters in the model is not tied to the size of the graph.

The variant we discuss here is the 2-parameter model from the original paper , which is more expressive. We also consider the following normalization (iteration subscripts omitted):
𝑓
(
𝑊
⋅
∑
𝑢
∈
𝑁
(
𝑣
)
ℎ
𝑢
∣
𝑁
(
𝑣
)
∣
+
𝐵
⋅
ℎ
𝑣
)
f
⎝
⎜
⎛
	​

W⋅
u∈N(v)
∑
	​

∣N(v)∣
h
u
	​

	​

+B⋅h
v
	​

⎠
⎟
⎞
	​


instead of the normalization defined in the original paper: 
𝑓
(
𝑊
⋅
∑
𝑢
∈
𝑁
(
𝑣
)
ℎ
𝑢
∣
𝑁
(
𝑢
)
∣
∣
𝑁
(
𝑣
)
∣
+
𝐵
⋅
ℎ
𝑣
)
f
⎝
⎜
⎛
	​

W⋅
u∈N(v)
∑
	​

∣N(u)∣∣N(v)∣
	​

h
u
	​

	​

+B⋅h
v
	​

⎠
⎟
⎞
	​

for ease of exposition.

Thoughts

An interesting point is to assess different aggregation functions: are some better and others worse?  demonstrates that aggregation functions indeed can be compared on how well they can uniquely preserve node neighbourhood features; we recommend the interested reader take a look at the detailed theoretical analysis there.

Here, we’ve talk about GNNs where the computation only occurs at the nodes. More recent GNN models such as Message-Passing Neural Networks  and Graph Networks  perform computation over the edges as well; they compute edge embeddings together with node embeddings. This is an even more general framework - but the same ‘message passing’ ideas from this section apply.

Interactive Graph Neural Networks

Below is an interactive visualization of these GNN models on small graphs. For clarity, the node features are just real numbers here, shown inside the squares next to each node, but the same equations hold when the node features are vectors.

GCN
GAT
GraphSAGE
GIN
Reset Undo Last Update Update All Nodes Randomize Graph
Initial Graph
Parameters for Next Update
𝑊
(
1
)
W
(1)
 1
𝐵
(
1
)
B
(1)
 1
A
6
B
2
C
-10
D
1
E
3

Next Update (Iteration 1):
Equation for Node 
𝐴
A:
ℎ
𝐴
(
1
)
	
=
𝑓
(
𝑊
(
1
)
×
ℎ
𝐶
(
0
)
+
ℎ
𝐸
(
0
)
2
+
𝐵
(
1
)
×
ℎ
𝐴
(
0
)
)


	
=
𝑓
(
1
×
−
10
+
3
2
+
1
×
6
)


	
=
𝑓
(
−
3.5
+
6
)


	
=
𝑓
(
2.5
)


	
=
ReLU
(
2.5
)
=
2.5.
h
A
(1)
	​

	​

=f(W
(1)
×
2
h
C
(0)
	​

+h
E
(0)
	​

	​

+B
(1)
×h
A
(0)
	​

)
=f(1×
2
−10+3
	​

+1×6)
=f(−3.5+6)
=f(2.5)
=ReLU(2.5)=2.5.
	​


Here, 
𝑓
f is just 
ReLU
ReLU: 
𝑓
(
𝑥
)
=
max
⁡
(
𝑥
,
0
)
f(x)=max(x,0).

Note that the weights 
𝑊
(
1
)
W
(1)
 and 
𝐵
(
1
)
B
(1)
 are shared across all nodes!

Choose a GNN model using the tabs at the top. Click on a node to see the update equation at that node for the next iteration. Use the sliders on the left to change the weights for the current iteration, and watch how the update equation changes.

In practice, each iteration above is generally thought of as a single ‘neural network layer’. This ideology is followed by many popular Graph Neural Network libraries, allowing one to compose different types of graph convolutions in the same model.

From Local to Global Convolutions

The methods we’ve seen so far perform ‘local’ convolutions: every node’s feature is updated using a function of its local neighbours’ features.

While performing enough steps of message-passing will eventually ensure that information from all nodes in the graph is passed, one may wonder if there are more direct ways to perform ‘global’ convolutions.

The answer is yes; we will now describe an approach that was actually first put forward in the context of neural networks by , much before any of the GNN models we looked at above.

Spectral Convolutions

As before, we will focus on the case where nodes have one-dimensional features. After choosing an arbitrary node-order, we can stack all of the node features to get a ‘feature vector’ 
𝑥
∈
𝑅
𝑛
x∈R
n
.

Key Idea: Given a feature vector 
𝑥
x, the Laplacian 
𝐿
L allows us to quantify how smooth 
𝑥
x is, with respect to 
𝐺
G.

How?

After normalizing 
𝑥
x such that 
∑
𝑖
=
1
𝑛
𝑥
𝑖
2
=
1
∑
i=1
n
	​
x
i
2
	​
=1, if we look at the following quantity involving 
𝐿
L: 
𝑅
𝐿
(
𝑥
)
=
𝑥
𝑇
𝐿
𝑥
𝑥
𝑇
𝑥
=
∑
(
𝑖
,
𝑗
)
∈
𝐸
(
𝑥
𝑖
−
𝑥
𝑗
)
2
∑
𝑖
𝑥
𝑖
2
=
∑
(
𝑖
,
𝑗
)
∈
𝐸
(
𝑥
𝑖
−
𝑥
𝑗
)
2
.
R
L
	​
(x)=
x
T
x
x
T
Lx
	​
=
∑
i
	​
x
i
2
	​

∑
(i,j)∈E
	​
(x
i
	​
−x
j
	​
)
2
	​
=
(i,j)∈E
∑
	​
(x
i
	​
−x
j
	​
)
2
.
we immediately see that feature vectors 
𝑥
x that assign similar values to adjacent nodes in 
𝐺
G (hence, are smooth) would have smaller values of 
𝑅
𝐿
(
𝑥
)
R
L
	​
(x).

𝐿
L is a real, symmetric matrix, which means it has all real eigenvalues 
𝜆
1
≤
…
≤
𝜆
𝑛
λ
1
	​
≤…≤λ
n
	​
. Further, the corresponding eigenvectors 
𝑢
1
,
…
,
𝑢
𝑛
u
1
	​
,…,u
n
	​
 can be taken to be orthonormal:
𝑢
𝑘
1
𝑇
𝑢
𝑘
2
=
{
1
 if 
𝑘
1
=
𝑘
2
.


0
 if 
𝑘
1
≠
𝑘
2
.
u
k
1
	​

T
	​
u
k
2
	​

	​
={
1 if k
1
	​
=k
2
	​
.
0 if k
1
	​
≠k
2
	​
.
	​

It turns out that these eigenvectors of 
𝐿
L are successively less smooth, as 
𝑅
𝐿
R
L
	​
 indicates: 
argmin
𝑥
,
 
𝑥
⊥
{
𝑢
1
,
…
,
𝑢
𝑖
−
1
}
𝑅
𝐿
(
𝑥
)
=
𝑢
𝑖
.
min
𝑥
,
 
𝑥
⊥
{
𝑢
1
,
…
,
𝑢
𝑖
−
1
}
𝑅
𝐿
(
𝑥
)
=
𝜆
𝑖
.
x, x⊥{u
1
	​
,…,u
i−1
	​
}
argmin
	​
R
L
	​
(x)=u
i
	​
.
x, x⊥{u
1
	​
,…,u
i−1
	​
}
min
	​
R
L
	​
(x)=λ
i
	​
.
The set of eigenvalues of 
𝐿
L are called its ‘spectrum’, hence the name! We denote the ‘spectral’ decomposition of 
𝐿
L as:
𝐿
=
𝑈
Λ
𝑈
𝑇
.
L=UΛU
T
.
where 
Λ
Λ is the diagonal matrix of sorted eigenvalues, and 
𝑈
U denotes the matrix of the eigenvectors (sorted corresponding to increasing eigenvalues):
Λ
=
[
𝜆
1
	
	


	
⋱
	


	
	
𝜆
𝑛
]
𝑈
=
[


𝑢
1
 
⋯
 
𝑢
𝑛


]
.
Λ=
⎣
⎡
	​

λ
1
	​

	​

⋱
	​

λ
n
	​

	​

⎦
⎤
	​
U=
⎣
⎡
	​

u
1
	​
 ⋯ u
n
	​

	​

⎦
⎤
	​
.
The orthonormality condition between eigenvectors gives us that 
𝑈
𝑇
𝑈
=
𝐼
U
T
U=I, the identity matrix. As these 
𝑛
n eigenvectors form a basis for 
𝑅
𝑛
R
n
, any feature vector 
𝑥
x can be represented as a linear combination of these eigenvectors:
𝑥
=
∑
𝑖
=
1
𝑛
𝑥
𝑖
^
𝑢
𝑖
=
𝑈
𝑥
^
.
x=
i=1
∑
n
	​

x
i
	​

^
	​
u
i
	​
=U
x
^
.
where 
𝑥
^
x
^
 is the vector of coefficients 
[
𝑥
0
,
…
𝑥
𝑛
]
[x
0
	​
,…x
n
	​
]. We call 
𝑥
^
x
^
 as the spectral representation of the feature vector 
𝑥
x. The orthonormality condition allows us to state:
𝑥
=
𝑈
𝑥
^
⟺
𝑈
𝑇
𝑥
=
𝑥
^
.
x=U
x
^
⟺U
T
x=
x
^
.
This pair of equations allows us to interconvert between the ‘natural’ representation 
𝑥
x and the ‘spectral’ representation 
𝑥
^
x
^
 for any vector 
𝑥
∈
𝑅
𝑛
x∈R
n
.

Spectral Representations of Natural Images

As discussed before, we can consider any image as a grid graph, where each pixel is a node, connected by edges to adjacent pixels. Thus, a pixel can have either 
3
,
5
,
3,5, or 
8
8 neighbours, depending on its location within the image grid. Each pixel gets a value as part of the image. If the image is grayscale, each value will be a single real number indicating how dark the pixel is. If the image is colored, each value will be a 
3
3-dimensional vector, indicating the values for the red, green and blue (RGB) channels. 

This construction allows us to compute the graph Laplacian and the eigenvector matrix 
𝑈
U. Given an image, we can then investigate what its spectral representation looks like.

To shed some light on what the spectral representation actually encodes, we perform the following experiment over each channel of the image independently:

We first collect all pixel values across a channel into a feature vector 
𝑥
x.
Then, we obtain its spectral representation 
𝑥
^
x
^
.
𝑥
^
=
𝑈
𝑇
𝑥
x
^
=U
T
x
We truncate this to the first 
𝑚
m components to get 
𝑥
^
𝑚
x
^
m
	​
. By truncation, we mean zeroing out all of the remaining 
𝑛
−
𝑚
n−m components of 
𝑥
^
x
^
. This truncation is equivalent to using only the first 
𝑚
m eigenvectors to compute the spectral representation.
𝑥
^
𝑚
=
Truncate
𝑚
(
𝑥
^
)
x
^
m
	​
=Truncate
m
	​
(
x
^
)
Then, we convert this truncated representation 
𝑥
^
𝑚
x
^
m
	​
 back to the natural basis to get 
𝑥
𝑚
x
m
	​
.
𝑥
𝑚
=
𝑈
𝑥
^
𝑚
x
m
	​
=U
x
^
m
	​


Finally, we stack the resulting channels back together to get back an image. We can now see how the resulting image changes with choices of 
𝑚
m. Note that when 
𝑚
=
𝑛
m=n, the resulting image is identical to the original image, as we can reconstruct each channel exactly.

Sample Image
 Chicken Fish Frog Spider
Original Image 
𝑥
x
Keep First 200 Spectral Components
Transformed Image 
𝑥
′
x
′
Number of Spectral Components (m)
 200
Use the radio buttons at the top to chose one of the four sample images. Each of these images has been taken from the ImageNet  dataset and downsampled to 
5
0
50 pixels wide and 
4
0
40 pixels tall. As there are 
𝑛
=
5
0
×
4
0
=
2
0
0
0
n=50×40=2000 pixels in each image, there are 
2
0
0
0
2000 Laplacian eigenvectors. Use the slider at the bottom to change the number of spectral components to keep, noting how images get progressively blurrier as the number of components decrease.

As 
𝑚
m decreases, we see that the output image 
𝑥
𝑚
x
m
	​
 gets blurrier. If we decrease 
𝑚
m to 
1
1, the output image 
𝑥
𝑚
x
m
	​
 is entirely the same color throughout. We see that we do not need to keep all 
𝑛
n components; we can retain a lot of the information in the image with significantly fewer components. We can relate this to the Fourier decomposition of images: the more eigenvectors we use, the higher frequencies we can represent on the grid.

To complement the visualization above, we additionally visualize the first few eigenvectors on a smaller 
8
×
8
8×8 grid below. We change the coefficients of the first 
1
0
10 out of 
6
4
64 eigenvectors in the spectral representation and see how the resulting image changes:

Spectral Representation
𝑥
^
=
[
𝑥
^
1
 
𝑥
^
2
 
𝑥
^
3
 
𝑥
^
4
 
𝑥
^
5
 
𝑥
^
6
 
𝑥
^
7
 
𝑥
^
8
 
𝑥
^
9
 
𝑥
^
10
]
x
^
=[
x
^
1
	​

 
x
^
2
	​

 
x
^
3
	​

 
x
^
4
	​

 
x
^
5
	​

 
x
^
6
	​

 
x
^
7
	​

 
x
^
8
	​

 
x
^
9
	​

 
x
^
10
	​

]
𝑅
𝐿
(
𝑥
)
=
1.55
R
L
	​

(x)=1.55
Natural Representation
𝑥
∈
𝑅
64
x∈R
64
Spectral Coefficient
Eigenvector #
Value
1.0
0.8
0.6
0.4
0.2
0.0
−0.2
−0.4
−0.6
−0.8
−1.0
1
2
3
4
5
6
7
8
9
10
−0.4
−0.2
0.0
0.2
0.4
Color Scale
𝑥
^
1
x
^
1
	​

 -0.8
𝑥
^
2
x
^
2
	​

 -0.1
𝑥
^
3
x
^
3
	​

 0.6
𝑥
^
4
x
^
4
	​

 -0.7
𝑥
^
5
x
^
5
	​

 1
𝑥
^
6
x
^
6
	​

 0.3
𝑥
^
7
x
^
7
	​

 -0.5
𝑥
^
8
x
^
8
	​

 0.8
𝑥
^
9
x
^
9
	​

 -0.9
𝑥
^
10
x
^
10
	​

 -0.7
Reset Coefficients
Move the sliders to change the spectral representation 
𝑥
^
x
^
 (right), and see how 
𝑥
x itself changes on the image (left). Note how the first eigenvectors are much ‘smoother’ than the later ones, and the many patterns we can make with only 
1
0
10 eigenvectors.

These visualizations should convince you that the first eigenvectors are indeed smooth, and the smoothness correspondingly decreases as we consider later eigenvectors.

For any image 
𝑥
x, we can think of the initial entries of the spectral representation 
𝑥
^
x
^
 as capturing ‘global’ image-wide trends, which are the low-frequency components, while the later entries as capturing ‘local’ details, which are the high-frequency components.

Embedding Computation

We now have the background to understand spectral convolutions and how they can be used to compute embeddings/feature representations of nodes.

As before, the model we describe below has 
𝐾
K layers: each layer 
𝑘
k has learnable parameters 
𝑤
^
(
𝑘
)
w
^
(k)
, called the ‘filter weights’. These weights will be convolved with the spectral representations of the node features. As a result, the number of weights needed in each layer is equal to 
𝑚
m, the number of eigenvectors used to compute the spectral representations. We had shown in the previous section that we can take 
𝑚
≪
𝑛
m≪n and still not lose out on significant amounts of information.

Thus, convolution in the spectral domain enables the use of significantly fewer parameters than just direct convolution in the natural domain. Further, by virtue of the smoothness of the Laplacian eigenvectors across the graph, using spectral representations automatically enforces an inductive bias for neighbouring nodes to get similar representations.

Assuming one-dimensional node features for now, the output of each layer is a vector of node representations 
ℎ
(
𝑘
)
h
(k)
, where each node’s representation corresponds to a row of the vector.

ℎ
(
𝑘
)
=
[
ℎ
1
(
𝑘
)


⋮


ℎ
𝑛
(
𝑘
)
]
h
(k)
=
⎣
⎢
⎢
⎢
⎡
	​

h
1
(k)
	​

⋮
h
n
(k)
	​

	​

⎦
⎥
⎥
⎥
⎤
	​

for each 
𝑘
=
0
,
1
,
2
,
…
k=0,1,2,… upto 
𝐾
K.

We fix an ordering of the nodes in 
𝐺
G. This gives us the adjacency matrix 
𝐴
A and the graph Laplacian 
𝐿
L, allowing us to compute 
𝑈
𝑚
U
m
	​
. Finally, we can describe the computation that the layers perform, one after the other:

Start with the original features.
ℎ
(
0
)
=
𝑥
h
(0)
=x
Then iterate, for 
𝑘
=
1
,
2
,
…
k=1,2,… upto 
𝐾
K:
ℎ
^
(
𝑘
−
1
)
	
=
𝑈
𝑚
𝑇
ℎ
(
𝑘
−
1
)




𝑔
^
(
𝑘
)
	
=
𝑤
^
(
𝑘
)
⊙
ℎ
^
(
𝑘
−
1
)




𝑔
(
𝑘
)
	
=
𝑈
𝑚
𝑔
^
(
𝑘
)




ℎ
(
𝑘
)
	
=
𝜎
(
𝑔
(
𝑘
)
)
h
^
(k−1)
g
^
	​

(k)
g
(k)
h
(k)
	​

=U
m
T
	​

h
(k−1)
=
w
^
(k)
⊙
h
^
(k−1)
=U
m
	​

g
^
	​

(k)
=σ(g
(k)
)
	​

Convert previous feature 
ℎ
(
𝑘
−
1
)
h
(k−1)
 to its spectral representation 
ℎ
^
(
𝑘
−
1
)
h
^
(k−1)
.
Convolve with filter weights 
𝑤
^
(
𝑘
)
w
^
(k)
 in the spectral domain to get 
𝑔
^
(
𝑘
)
.
g
^
	​

(k)
.
⊙
⊙ represents element-wise multiplication.
Convert 
𝑔
^
(
𝑘
)
g
^
	​

(k)
 back to its natural representation 
𝑔
(
𝑘
)
g
(k)
.
Apply a non-linearity 
𝜎
σ to 
𝑔
(
𝑘
)
g
(k)
 to get 
ℎ
(
𝑘
)
h
(k)
.
Color Codes:
Computed node embeddings.
Learnable parameters.

The method above generalizes easily to the case where each 
ℎ
(
𝑘
)
∈
𝑅
𝑑
𝑘
h
(k)
∈R
d
k
	​

, as well: see  for details.

With the insights from the previous section, we see that convolution in the spectral-domain of graphs can be thought of as the generalization of convolution in the frequency-domain of images.

Spectral Convolutions are Node-Order Equivariant

We can show spectral convolutions are node-order equivariant using a similar approach as for Laplacian polynomial filters.

Details for the Interested Reader

As in our proof before, let’s fix an arbitrary node-order. Then, any other node-order can be represented by a permutation of this original node-order. We can associate this permutation with its permutation matrix 
𝑃
P. Under this new node-order, the quantities below transform in the following way:
𝑥
	
→
𝑃
𝑥


𝐴
	
→
𝑃
𝐴
𝑃
𝑇


𝐿
	
→
𝑃
𝐿
𝑃
𝑇


𝑈
𝑚
	
→
𝑃
𝑈
𝑚
x
A
L
U
m
	​

	​

→Px
→PAP
T
→PLP
T
→PU
m
	​

	​

which implies that, in the embedding computation:
𝑥
^
	
→
(
𝑃
𝑈
𝑚
)
𝑇
(
𝑃
𝑥
)
=
𝑈
𝑚
𝑇
𝑥
=
𝑥
^


𝑤
^
	
→
(
𝑃
𝑈
𝑚
)
𝑇
(
𝑃
𝑤
)
=
𝑈
𝑚
𝑇
𝑤
=
𝑤
^


𝑔
^
	
→
𝑔
^


𝑔
	
→
(
𝑃
𝑈
𝑚
)
𝑔
^
=
𝑃
(
𝑈
𝑚
𝑔
^
)
=
𝑃
𝑔
x
^
w
^
g
^
	​

g
	​

→(PU
m
	​
)
T
(Px)=U
m
T
	​
x=
x
^
→(PU
m
	​
)
T
(Pw)=U
m
T
	​
w=
w
^
→
g
^
	​

→(PU
m
	​
)
g
^
	​
=P(U
m
	​

g
^
	​
)=Pg
	​

Hence, as 
𝜎
σ is applied elementwise:
𝑓
(
𝑃
𝑥
)
=
𝜎
(
𝑃
𝑔
)
=
𝑃
𝜎
(
𝑔
)
=
𝑃
𝑓
(
𝑥
)
f(Px)=σ(Pg)=Pσ(g)=Pf(x)
as required. Further, we see that the spectral quantities 
𝑥
^
,
𝑤
^
x
^
,
w
^
 and 
𝑔
^
g
^
	​
 are unchanged by permutations of the nodes. 

The theory of spectral convolutions is mathematically well-grounded; however, there are some key disadvantages that we must talk about:

We need to compute the eigenvector matrix 
𝑈
𝑚
U
m
	​
 from 
𝐿
L. For large graphs, this becomes quite infeasible.
Even if we can compute 
𝑈
𝑚
U
m
	​
, global convolutions themselves are inefficient to compute, because of the repeated multiplications with 
𝑈
𝑚
U
m
	​
 and 
𝑈
𝑚
𝑇
U
m
T
	​
.
The learned filters are specific to the input graphs, as they are represented in terms of the spectral decomposition of input graph Laplacian 
𝐿
L. This means they do not transfer well to new graphs which have significantly different structure (and hence, significantly different eigenvalues) .

While spectral convolutions have largely been superseded by ‘local’ convolutions for the reasons discussed above, there is still much merit to understanding the ideas behind them. Indeed, a recently proposed GNN model called Directional Graph Networks  actually uses the Laplacian eigenvectors and their mathematical properties extensively.

Global Propagation via Graph Embeddings

A simpler way to incorporate graph-level information is to compute embeddings of the entire graph by pooling node (and possibly edge) embeddings, and then using the graph embedding to update node embeddings, following an iterative scheme similar to what we have looked at here. This is an approach used by Graph Networks . We will briefly discuss how graph-level embeddings can be constructed in Pooling. However, such approaches tend to ignore the underlying topology of the graph that spectral convolutions can capture.

Learning GNN Parameters

All of the embedding computations we’ve described here, whether spectral or spatial, are completely differentiable. This allows GNNs to be trained in an end-to-end fashion, just like a standard neural network, once a suitable loss function 
𝐿
L is defined:

Node Classification: By minimizing any of the standard losses for classification tasks, such as categorical cross-entropy when multiple classes are present:
𝐿
(
𝑦
𝑣
,
𝑦
𝑣
^
)
=
−
∑
𝑐
𝑦
𝑣
𝑐
log
𝑦
𝑣
𝑐
^
.
L(y
v
	​
,
y
v
	​

^
	​
)=−
c
∑
	​
y
vc
	​
log
y
vc
	​

^
	​
.
where 
𝑦
𝑣
𝑐
^
y
vc
	​

^
	​
 is the predicted probability that node 
𝑣
v is in class 
𝑐
c. GNNs adapt well to the semi-supervised setting, which is when only some nodes in the graph are labelled. In this setting, one way to define a loss 
𝐿
𝐺
L
G
	​
 over an input graph 
𝐺
G is:
𝐿
𝐺
=
∑
𝑣
∈
Lab
(
𝐺
)
𝐿
(
𝑦
𝑣
,
𝑦
𝑣
^
)
∣
Lab
(
𝐺
)
∣
L
G
	​
=
∣Lab(G)∣
v∈Lab(G)
∑
	​
L(y
v
	​
,
y
v
	​

^
	​
)
	​

where, we only compute losses over labelled nodes 
Lab
(
𝐺
)
Lab(G).
Graph Classification: By aggregating node representations, one can construct a vector representation of the entire graph. This graph representation can be used for any graph-level task, even beyond classification. See Pooling for how representations of graphs can be constructed.
Link Prediction: By sampling pairs of adjacent and non-adjacent nodes, and use these vector pairs as inputs to predict the presence/absence of an edge. For a concrete example, by minimizing the following ‘logistic regression’-like loss:
𝐿
(
𝑦
𝑣
,
𝑦
𝑢
,
𝑒
𝑣
𝑢
)
	
=
−
𝑒
𝑣
𝑢
log
(
𝑝
𝑣
𝑢
)
−
(
1
−
𝑒
𝑣
𝑢
)
log
(
1
−
𝑝
𝑣
𝑢
)


𝑝
𝑣
𝑢
	
=
𝜎
(
𝑦
𝑣
𝑇
𝑦
𝑢
)
L(y
v
	​
,y
u
	​
,e
vu
	​
)
p
vu
	​

	​

=−e
vu
	​
log(p
vu
	​
)−(1−e
vu
	​
)log(1−p
vu
	​
)
=σ(y
v
T
	​
y
u
	​
)
	​

where 
𝜎
σ is the sigmoid function, and 
𝑒
𝑣
𝑢
=
1
e
vu
	​
=1 iff there is an edge between nodes 
𝑣
v and 
𝑢
u, being 
0
0 otherwise.
Node Clustering: By simply clustering the learned node representations.

The broad success of pre-training for natural language processing models such as ELMo  and BERT  has sparked interest in similar techniques for GNNs . The key idea in each of these papers is to train GNNs to predict local (eg. node degrees, clustering coefficient, masked node attributes) and/or global graph properties (eg. pairwise distances, masked global attributes).

Another self-supervised technique is to enforce that neighbouring nodes get similar embeddings, mimicking random-walk approaches such as node2vec  and DeepWalk :

𝐿
𝐺
=
∑
𝑣
∑
𝑢
∈
𝑁
𝑅
(
𝑣
)
log
exp
𝑧
𝑣
𝑇
𝑧
𝑢
∑
𝑢
′
exp
𝑧
𝑢
′
𝑇
𝑧
𝑢
.
L
G
	​
=
v
∑
	​

u∈N
R
	​
(v)
∑
	​
log
u
′
∑
	​
expz
u
′
T
	​
z
u
	​

expz
v
T
	​
z
u
	​

	​
.

where 
𝑁
𝑅
(
𝑣
)
N
R
	​
(v) is a multi-set of nodes visited when random walks are started from 
𝑣
v. For large graphs, where computing the sum over all nodes may be computationally expensive, techniques such as Noise Contrastive Estimation  are especially useful.

Conclusion and Further Reading

While we have looked at many techniques and ideas in this article, the field of Graph Neural Networks is extremely vast. We have been forced to restrict our discussion to a small subset of the entire literature, while still communicating the key ideas and design principles behind GNNs. We recommend the interested reader take a look at  for a more comprehensive survey.

We end with pointers and references for additional concepts readers might be interested in:

GNNs in Practice

It turns out that accomodating the different structures of graphs is often hard to do efficiently, but we can still represent many GNN update equations using as sparse matrix-vector products (since generally, the adjacency matrix is sparse for most real-world graph datasets.) For example, the GCN variant discussed here can be represented as:
ℎ
(
𝑘
)
=
𝐷
−
1
𝐴
⋅
ℎ
(
𝑘
−
1
)
𝑊
(
𝑘
)
𝑇
+
ℎ
(
𝑘
−
1
)
𝐵
(
𝑘
)
𝑇
.
h
(k)
=D
−1
A⋅h
(k−1)
W
(k)
T
+h
(k−1)
B
(k)
T
.
Restructuring the update equations in this way allows for efficient vectorized implementations of GNNs on accelerators such as GPUs.

Regularization techniques for standard neural networks, such as Dropout , can be applied in a straightforward manner to the parameters (for example, zero out entire rows of 
𝑊
(
𝑘
)
W
(k)
 above). However, there are graph-specific techniques such as DropEdge  that removes entire edges at random from the graph, that also boost the performance of many GNN models.

Different Kinds of Graphs

Here, we have focused on undirected graphs, to avoid going into too many unnecessary details. However, there are some simple variants of spatial convolutions for:

Directed graphs: Aggregate across in-neighbourhood and/or out-neighbourhood features.
Temporal graphs: Aggregate across previous and/or future node features.
Heterogeneous graphs: Learn different aggregation functions for each node/edge type.

There do exist more sophisticated techniques that can take advantage of the different structures of these graphs: see  for more discussion.

Pooling

This article discusses how GNNs compute useful representations of nodes. But what if we wanted to compute representations of graphs for graph-level tasks (for example, predicting the toxicity of a molecule)?

A simple solution is to just aggregate the final node embeddings and pass them through another neural network 
PREDICT
𝐺
PREDICT
G
	​
:
ℎ
𝐺
=
PREDICT
𝐺
(
AGG
𝑣
∈
𝐺
(
{
ℎ
𝑣
}
)
)
h
G
	​
=PREDICT
G
	​
(AGG
v∈G
	​
({h
v
	​
}))
However, there do exist more powerful techniques for ‘pooling’ together node representations:

SortPool: Sort vertices of the graph to get a fixed-size node-order invariant representation of the graph, and then apply any standard neural network architecture.
DiffPool: Learn to cluster vertices, build a coarser graph over clusters instead of nodes, then apply a GNN over the coarser graph. Repeat until only one cluster is left.
SAGPool: Apply a GNN to learn node scores, then keep only the nodes with the top scores, throwing away the rest. Repeat until only one node is left.
Supplementary Material
Reproducing Experiments

The experiments from Spectral Representations of Natural Images can be reproduced using the following Colab  notebook: Spectral Representations of Natural Images.

Recreating Visualizations

To aid in the creation of future interactive articles, we have created ObservableHQ  notebooks for each of the interactive visualizations here:

Neighbourhood Definitions for CNNs and GNNs
Graph Polynomial Convolutions on a Grid
Graph Polynomial Convolutions: Equations
Modern Graph Neural Networks: Equations
Modern Graph Neural Networks: Interactive Models which pulls together the following standalone notebooks:
Graph Convolutional Networks
Graph Attention Networks
GraphSAGE
Graph Isomorphism Networks
Laplacian Eigenvectors for Grids
Spectral Decomposition of Natural Images
Spectral Convolutions: Equations
Footnotes
These kinds of graphs are called ‘homogeneous’.[↩]
The curious reader may wonder if performing some sort of padding and ordering could be done to ensure the consistency of neighbourhood structure across nodes. This has been attempted with some success , but the techniques we will look at here are more general and powerful. [↩]
In the sense that given either of the matrices 
𝐴
A or 
𝐿
L, you can construct the other. [↩]
The graph Laplacian shows up in many mathematical problems involving graphs: random walks, spectral clustering, and diffusion, to name a few. [↩]
For readers familiar with Laplacian filtering of images, this is the exact same idea. When 
𝑥
x is an image, 
𝑥
′
=
𝐿
𝑥
x
′
=Lx is exactly the result of applying a ‘Laplacian filter’ to 
𝑥
x. [↩]
This is Lemma 5.2 from .[↩]
We discuss the eigenvalues of the Laplacian 
𝐿
L in more detail in a later section. [↩]
For example: PyTorch Geometric and StellarGraph. [↩]
𝑅
𝐿
R
L
	​
 is formally called the Rayleigh quotient. [↩]
An eigenvalue 
𝜆
λ of a matrix 
𝐴
A is a value satisfying the equation 
𝐴
𝑢
=
𝜆
𝑢
Au=λu for a certain vector 
𝑢
u, called an eigenvector. For a friendly introduction to eigenvectors, please see this tutorial. [↩]
This is the min-max theorem for eigenvalues.[↩]
We use the alpha channel as well in the visualization below, so this is actually RGBA.[↩]
Formally, they are what we would call node-order invariant. [↩]
Acknowledgments

We are deeply grateful to ObservableHQ, a wonderful platform for developing interactive visualizations. The static visualizations would not have been possible without Inkscape and Alexander Lenail’s Neural Network SVG Generator. The molecule diagrams depicted above were obtained and modified from Wikimedia Commons, available in the public domain.

We would like to acknowledge the following Distill articles for inspiration on article design:

Visualizing memorization in RNNs
Understanding RL Vision

We would like to thank Thomas Kipf for his valuable feedback on the technical content within this article.

We would like to thank David Nichols for creating Coloring for Colorblindness which helped us improve the accessibility of this article’s color scheme.

We would also like to acknowledge CS224W: Machine Learning with Graphs as an excellent reference from which the authors benefitted significantly.

Ashish Tendulkar from Google Research India provided significant feedback on the content within this article, helping its readability. He also helped with identifying the topics this article should cover, and with brainstorming the experiments here.

Adam Pearce from Google Research helped us immensely with article hosting and rendering.

Finally, we would like to thank Anirban Santara, Sujoy Paul and Ansh Khurana from Google Research India for their help with setting up and running experiments.

Author Contributions

Ameya Daigavane drafted most of the text, designed experiments and created the interactive visualizations in this article. Balaraman Ravindran and Gaurav Aggarwal extensively guided the overall direction of the article, deliberated over the design and scope of experiments, provided much feedback on the interactive visualizations, edited the text, and described improvements to make the article more accessible to readers.

Discussion and Review

Review 1 - Chaitanya K. Joshi
Review 2 - Nick Moran
Review 3 - Anonymous


References
A Gentle Introduction to Graph Neural Networks
Sanchez-Lengeling, B., Reif, E., Pearce, A. and Wiltschko, A., 2021. Distill. DOI: 10.23915/distill.00033
Graph Kernels  [HTML]
Vishwanathan, S., Schraudolph, N.N., Kondor, R. and Borgwardt, K.M., 2010. Journal of Machine Learning Research, Vol 11(40), pp. 1201-1242.
Node2vec: Scalable Feature Learning for Networks  [link]
Grover, A. and Leskovec, J., 2016. Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, pp. 855–864. Association for Computing Machinery. DOI: 10.1145/2939672.2939754
DeepWalk: Online Learning of Social Representations  [link]
Perozzi, B., Al-Rfou, R. and Skiena, S., 2014. Proceedings of the 20th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, pp. 701–710. Association for Computing Machinery. DOI: 10.1145/2623330.2623732
Convolutional Networks on Graphs for Learning Molecular Fingerprints  [PDF]
Duvenaud, D.K., Maclaurin, D., Iparraguirre, J., Bombarell, R., Hirzel, T., Aspuru-Guzik, A. and Adams, R.P., 2015. Advances in Neural Information Processing Systems, Vol 28, pp. 2224-2232. Curran Associates, Inc.
Neural Message Passing for Quantum Chemistry  [HTML]
Gilmer, J., Schoenholz, S.S., Riley, P.F., Vinyals, O. and Dahl, G.E., 2017. Proceedings of the 34th International Conference on Machine Learning, Vol 70, pp. 1263-1272. PMLR.
Learning Convolutional Neural Networks for Graphs
Niepert, M., Ahmed, M. and Kutzkov, K., 2016. Proceedings of the 33rd International Conference on International Conference on Machine Learning - Volume 48, pp. 2014–2023. JMLR.org.
A Tutorial on Spectral Clustering  [PDF]
Luxburg, U.v., 2007. CoRR, Vol abs/0711.0189.
Convolutional Neural Networks on Graphs with Fast Localized Spectral Filtering  [PDF]
Defferrard, M., Bresson, X. and Vandergheynst, P., 2016. Advances in Neural Information Processing Systems, Vol 29, pp. 3844-3852. Curran Associates, Inc.
Wavelets on Graphs via Spectral Graph Theory  [link]
Hammond, D.K., Vandergheynst, P. and Gribonval, R., 2011. Applied and Computational Harmonic Analysis, Vol 30(2), pp. 129 - 150. DOI: https://doi.org/10.1016/j.acha.2010.04.005
Chebyshev Polynomials  [link]
Mason, J. and Handscomb, D., 2002. CRC Press.
Semi-Supervised Classification with Graph Convolutional Networks  [link]
Kipf, T.N. and Welling, M., 2017. 5th International Conference on Learning Representations (ICLR) 2017, Toulon, France, April 24-26, 2017, Conference Track Proceedings. OpenReview.net.
Graph Attention Networks  [link]
Veličković, P., Cucurull, G., Casanova, A., Romero, A., Liò, P. and Bengio, Y., 2018. International Conference on Learning Representations.
Inductive Representation Learning on Large Graphs  [PDF]
Hamilton, W., Ying, Z. and Leskovec, J., 2017. Advances in Neural Information Processing Systems, Vol 30, pp. 1024-1034. Curran Associates, Inc.
How Powerful are Graph Neural Networks?  [link]
Xu, K., Hu, W., Leskovec, J. and Jegelka, S., 2019. International Conference on Learning Representations.
Relational inductive biases, deep learning, and graph networks  [PDF]
Battaglia, P.W., Hamrick, J.B., Bapst, V., Sanchez-Gonzalez, A., Zambaldi, V.F., Malinowski, M., Tacchetti, A., Raposo, D., Santoro, A., Faulkner, R., Gulcehre, C., Song, H.F., Ballard, A.J., Gilmer, J., Dahl, G.E., Vaswani, A., Allen, K.R., Nash, C., Langston, V., Dyer, C., Heess, N., Wierstra, D., Kohli, P., Botvinick, M., Vinyals, O., Li, Y. and Pascanu, R., 2018. CoRR, Vol abs/1806.01261.
Spectral Networks and Locally Connected Networks on Graphs  [PDF]
Bruna, J., Zaremba, W., Szlam, A. and LeCun, Y., 2014. International Conference on Learning Representations (ICLR 2014), CBLS, April 2014.
ImageNet: A Large-Scale Hierarchical Image Database
Deng, J., Dong, W., Socher, R., Li, L., Li, K. and Fei-Fei, L., 2009. CVPR09.
On the Transferability of Spectral Graph Filters
Levie, R., Isufi, E. and Kutyniok, G., 2019. 2019 13th International conference on Sampling Theory and Applications (SampTA), Vol (), pp. 1-5. DOI: 10.1109/SampTA45681.2019.9030932
Directional Graph Networks
Beaini, D., Passaro, S., Létourneau, V., Hamilton, W.L., Corso, G. and Liò, P., 2021.
Deep contextualized word representations
Peters, M.E., Neumann, M., Iyyer, M., Gardner, M., Clark, C., Lee, K. and Zettlemoyer, L., 2018. Proc. of NAACL.
BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding  [link]
Devlin, J., Chang, M., Lee, K. and Toutanova, K., 2019. Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies, Volume 1 (Long and Short Papers), pp. 4171-4186. Association for Computational Linguistics. DOI: 10.18653/v1/N19-1423
Strategies for Pre-training Graph Neural Networks  [link]
Hu*, W., Liu*, B., Gomes, J., Zitnik, M., Liang, P., Pande, V. and Leskovec, J., 2020. International Conference on Learning Representations.
Multi-Stage Self-Supervised Learning for Graph Convolutional Networks on Graphs with Few Labeled Nodes  [link]
Sun, K., Lin, Z. and Zhu, Z., 2020. The Thirty-Fourth AAAI Conference on Artificial Intelligence, AAAI 2020, The Thirty-Second Innovative Applications of Artificial Intelligence Conference, IAAI 2020, The Tenth AAAI Symposium on Educational Advances in Artificial Intelligence, EAAI 2020, New York, NY, USA, February 7-12, 2020, pp. 5892-5899. AAAI Press.
When Does Self-Supervision Help Graph Convolutional Networks?  [PDF]
You, Y., Chen, T., Wang, Z. and Shen, Y., 2020.
Self-supervised Learning on Graphs: Deep Insights and New Direction  [PDF]
Jin, W., Derr, T., Liu, H., Wang, Y., Wang, S., Liu, Z. and Tang, J., 2020.
Noise-Contrastive Estimation of Unnormalized Statistical Models, with Applications to Natural Image Statistics  [HTML]
Gutmann, M.U. and Hyvärinen, A., 2012. Journal of Machine Learning Research, Vol 13(11), pp. 307-361.
Learning word embeddings efficiently with noise-contrastive estimation  [PDF]
Mnih, A. and Kavukcuoglu, K., 2013. Advances in Neural Information Processing Systems, Vol 26, pp. 2265-2273. Curran Associates, Inc.
A Comprehensive Survey on Graph Neural Networks  [link]
Wu, Z., Pan, S., Chen, F., Long, G., Zhang, C. and Yu, P.S., 2020. IEEE Transactions on Neural Networks and Learning Systems, pp. 1-21. DOI: 10.1109/TNNLS.2020.2978386
Graph Neural Networks: A Review of Methods and Applications  [PDF]
Zhou, J., Cui, G., Zhang, Z., Yang, C., Liu, Z. and Sun, M., 2018. CoRR, Vol abs/1812.08434.
Dropout: A Simple Way to Prevent Neural Networks from Overfitting  [HTML]
Srivastava, N., Hinton, G., Krizhevsky, A., Sutskever, I. and Salakhutdinov, R., 2014. Journal of Machine Learning Research, Vol 15(56), pp. 1929-1958.
DropEdge: Towards Deep Graph Convolutional Networks on Node Classification  [link]
Rong, Y., Huang, W., Xu, T. and Huang, J., 2020. International Conference on Learning Representations.
An End-to-End Deep Learning Architecture for Graph Classification  [link]
Zhang, M., Cui, Z., Neumann, M. and Chen, Y., 2018. Proceedings of the Thirty-Second AAAI Conference on Artificial Intelligence, (AAAI-18), the 30th innovative Applications of Artificial Intelligence (IAAI-18), and the 8th AAAI Symposium on Educational Advances in Artificial Intelligence (EAAI-18), New Orleans, Louisiana, USA, February 2-7, 2018, pp. 4438-4445. AAAI Press.
Hierarchical Graph Representation Learning with Differentiable Pooling  [PDF]
Ying, Z., You, J., Morris, C., Ren, X., Hamilton, W. and Leskovec, J., 2018. Advances in Neural Information Processing Systems, Vol 31, pp. 4800-4810. Curran Associates, Inc.
Self-Attention Graph Pooling  [HTML]
Lee, J., Lee, I. and Kang, J., 2019. Proceedings of the 36th International Conference on Machine Learning, Vol 97, pp. 3734-3743. PMLR.
Updates and Corrections

If you see mistakes or want to suggest changes, please create an issue on GitHub.

Reuse

Diagrams and text are licensed under Creative Commons Attribution CC-BY 4.0 with the source available on GitHub, unless noted otherwise. The figures that have been reused from other sources don’t fall under this license and can be recognized by a note in their caption: “Figure from …”.

Citation

For attribution in academic contexts, please cite this work as

Daigavane, et al., "Understanding Convolutions on Graphs", Distill, 2021.

BibTeX citation

@article{daigavane2021understanding,
  author = {Daigavane, Ameya and Ravindran, Balaraman and Aggarwal, Gaurav},
  title = {Understanding Convolutions on Graphs},
  journal = {Distill},
  year = {2021},
  note = {https://distill.pub/2021/understanding-gnns},
  doi = {10.23915/distill.00032}
}


## 来源

- **Feed**: Distill: Machine Learning Research
- **链接**: https://distill.pub/2021/understanding-gnns
- **发布时间**: Thu, 02 Sep 2021 20:0:0 Z
- **采集时间**: 2026-02-19T06:03:37.174Z

## 相关链接

- [[001-zettelkasten-是什么]]

---
*RSS 自动采集 - 请人工审查并补充内容链接*
